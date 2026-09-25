#!/bin/bash
# Publica la web. Uso:
#   ./publicar.sh pre          -> demo completa a pre.colmillostudio.com
#   ./publicar.sh pre real     -> build de produccion a pre.colmillostudio.com
#   ./publicar.sh dominio      -> PUBLICA de verdad en colmillostudio.com
set -e
export PATH=/opt/plesk/node/22/bin:$PATH
export PUBLIC_SITE_URL="https://colmillostudio.com/"
cd "$(dirname "$0")"

DESTINO="$1"; MODO="${2:-demo}"
PRE=~/pre.colmillostudio.com
WEB=~/httpdocs

case "$DESTINO" in
  pre)     RUTA="$PRE" ;;
  dominio) RUTA="$WEB"; MODO="real" ;;
  *) echo "Uso: ./publicar.sh [pre|dominio] [demo|real]"; exit 1 ;;
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
rsync -a --delete --exclude .well-known "$SALIDA/" "$RUTA/"
echo "== hecho: $(find "$RUTA" -type f | wc -l) archivos =="
