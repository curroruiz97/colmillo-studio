#!/bin/bash
# Publica la web. Uso:
#   ./publicar.sh pre          -> demo completa a pre.colmillostudio.com
#   ./publicar.sh pre real     -> build de produccion a pre.colmillostudio.com
#   ./publicar.sh dominio      -> PUBLICA de verdad en colmillostudio.com
#   ./publicar.sh tienda       -> la tienda (maqueta) a tienda.colmillostudio.com
#
# `pre` publica ademas la tienda en pre.colmillostudio.com/tienda/, detras
# de la misma contrasena, para verla antes de que exista su subdominio.
set -e
export PATH=/opt/plesk/node/22/bin:$PATH
export PUBLIC_SITE_URL="https://colmillostudio.com/"
cd "$(dirname "$0")"

DESTINO="$1"; MODO="${2:-demo}"
PRE=~/pre.colmillostudio.com
WEB=~/httpdocs
TIENDA=~/tienda.colmillostudio.com

# La tienda: su propia build, en su propia carpeta; nunca toca la web.
publicar_tienda() {  # $1 destino, $2 base ("/" o "/tienda/")
  echo "== compilando la tienda (base $2) =="
  SHOP_BASE="$2" SHOP_OUT_DIR="../dist-shop-publicar" npm run build:shop
  [ -f dist-shop-publicar/index.html ] || { echo "Build de la tienda vacia, abortado"; exit 1; }
  mkdir -p "$1"
  # Plesk keeps its per-site PHP markers in the document root: never deleted.
  rsync -rlt --delete --exclude .well-known --exclude .php-ini --exclude .php-version \
    dist-shop-publicar/ "$1/"
  rm -rf dist-shop-publicar
  echo "== tienda publicada en $1: $(find "$1" -type f | wc -l) archivos =="
}

if [ "$1" = "tienda" ]; then
  [ -d "$TIENDA" ] || {
    echo "No existe $TIENDA."
    echo "Crea antes el subdominio tienda.colmillostudio.com en Plesk (y su"
    echo "registro DNS en IONOS). Ver docs/DEPLOYMENT.md."
    exit 1
  }
  npm run check && npm run lint
  publicar_tienda "$TIENDA" "/"
  exit 0
fi

case "$DESTINO" in
  pre)     RUTA="$PRE" ;;
  dominio) RUTA="$WEB"; MODO="real" ;;
  *) echo "Uso: ./publicar.sh [pre|dominio|tienda] [demo|real]"; exit 1 ;;
esac

if [ "$DESTINO" = "dominio" ]; then
  echo "ATENCION: esto sustituye la pagina de proximamente por la web."
  read -p "Escribe PUBLICAR para continuar: " c
  [ "$c" = "PUBLICAR" ] || { echo "Cancelado."; exit 1; }
fi

echo "== validando y compilando ($MODO) =="
if [ "$MODO" = "real" ]; then npm run validate; SALIDA=dist
else npm run check && npm run lint && npm run build:demo; SALIDA=dist-demo; fi

[ -f "$SALIDA/index.html" ] || { echo "Build vacia, abortado"; exit 1; }

echo "== publicando en $RUTA =="
# La carpeta /tienda/ del preview es de la tienda: el --delete no la toca.
rsync -rlt --delete --exclude .well-known --exclude /tienda/ "$SALIDA/" "$RUTA/"
echo "== hecho: $(find "$RUTA" -type f -not -path "$RUTA/tienda/*" | wc -l) archivos =="

if [ "$DESTINO" = "pre" ]; then
  publicar_tienda "$PRE/tienda" "/tienda/"
fi
