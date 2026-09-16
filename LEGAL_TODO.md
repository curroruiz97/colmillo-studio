# COLMILLO STUDIO - DATOS LEGALES PENDIENTES

Lista exacta de la información que hay que pedir al cliente para completar
`/aviso-legal/`, `/privacidad/` y `/cookies/`.

Las tres páginas ya están construidas, redactadas conforme a lo que la web
hace realmente y enlazadas desde el footer. Lo único que falta son los datos
de identidad del titular, que **no existen en ninguna parte del repositorio** y
que por tanto **no se han inventado**: aparecen en las páginas como marcas
`[PENDIENTE: …]` en rojo, imposibles de confundir con un dato real.

`npm run release:check` falla mientras quede una sola de esas marcas en
`dist/`, de modo que la web no puede publicarse como versión definitiva con los
huecos sin rellenar.

Fecha de esta lista: 2026-09-16.

---

## 1. Identidad del titular (obligatorio — LSSI-CE art. 10)

Sin estos datos el aviso legal no cumple la ley.

| Dato                                     | Estado    | Dónde se usa                    |
| ---------------------------------------- | --------- | ------------------------------- |
| Nombre y apellidos o razón social        | PENDIENTE | Aviso legal, Privacidad         |
| NIF / CIF                                | PENDIENTE | Aviso legal, Privacidad         |
| Domicilio (calle, número, CP, localidad) | PENDIENTE | Aviso legal, Privacidad, Fuero  |
| Forma jurídica (autónomo / S.L. / otra)  | PENDIENTE | Decide si hay datos registrales |

**Pregunta clave:** ¿el titular es persona física (autónomo) o sociedad?

- Si es **autónomo**: basta con nombre, apellidos, NIF y domicilio. No hay
  datos registrales y no debe inventarse ninguno.
- Si es **sociedad**: hacen falta además los datos de inscripción en el
  Registro Mercantil (registro, tomo, folio, hoja, inscripción). **No se ha
  escrito ninguno**, precisamente porque no consta la forma jurídica.

## 2. Contacto

| Dato           | Estado                    | Nota                                 |
| -------------- | ------------------------- | ------------------------------------ |
| Correo público | `hola@colmillostudio.com` | **Confirmar ortografía** (ver abajo) |
| Instagram      | `@colmillo.studio`        | Verificado y publicado               |
| Teléfono       | PENDIENTE (opcional)      | No es obligatorio; hoy no se publica |

**Discrepancia que hay que resolver antes de publicar:** en la conversación se
ha escrito `hola@colmilloestudio.com` (con «estudio»), pero la dirección
aprobada y publicada en todo el proyecto desde el 2026-09-09 es
`hola@colmillostudio.com` (con «studio»). Las páginas legales toman la
dirección automáticamente de `src/config/contact.ts`, así que basta con
corregirla ahí una sola vez si la buena es la otra. **No se ha cambiado por
cuenta propia.**

## 3. Privacidad

| Dato                                          | Estado    | Por qué hace falta                          |
| --------------------------------------------- | --------- | ------------------------------------------- |
| Proveedor de correo electrónico del estudio   | PENDIENTE | Es encargado del tratamiento (art. 28 RGPD) |
| Contratos de encargo del tratamiento firmados | PENDIENTE | Con el hosting y con el correo              |
| Garantías de transferencia internacional      | PENDIENTE | El hosting (Vercel Inc.) es de EE. UU.      |
| Plazo concreto de conservación                | PENDIENTE | Hoy se describe por criterios, no por meses |

Notas sobre lo anterior:

- **Alojamiento:** verificado. El sitio se sirve desde Vercel (cabecera
  `Server: Vercel`, proyecto `colmillo-studio` en la cuenta del cliente). Se
  menciona como encargado del tratamiento porque es un hecho comprobado, no
  una suposición. Falta acreditar el contrato y la garantía de transferencia.
- **Delegado de protección de datos:** no se ha designado, y se explica por
  qué. Si el cliente decide nombrar uno, hay que añadir su contacto.
- **No hace falta** ningún dato más: la web no recoge datos por sí misma (ver
  punto 5).

## 4. Decisiones que necesitan el visto bueno del cliente

- **Fuero / jurisdicción:** hoy el aviso legal remite a la normativa aplicable
  y respeta el fuero del consumidor, sin fijar una ciudad concreta. Si se
  quiere designar una, hace falta el domicilio del titular.
- **Dominio definitivo:** todavía no hay dominio propio. Hasta que exista,
  `PUBLIC_SITE_URL` sigue vacío, no hay URL canónica ni sitemap, y la web
  permanece con `noindex` y `robots.txt` bloqueante.
- **Revisión jurídica:** estos textos están redactados sobre la realidad
  técnica del proyecto, pero conviene que los revise un profesional antes de
  la publicación definitiva.

## 5. Lo que NO hace falta pedir (ya verificado)

Para evitar preguntas innecesarias al cliente, esto ya está comprobado en el
código y en el sitio desplegado:

- **No hay cookies.** Ni propias ni de terceros. El servidor no envía ninguna
  cabecera `Set-Cookie` y en el código no existe ni una llamada a
  `document.cookie`.
- **No hay analítica.** Ni Google Analytics, ni Tag Manager, ni Meta Pixel, ni
  Vercel Web Analytics o Speed Insights (comprobado también en el panel de
  Vercel y en el HTML servido).
- **No hay contenido incrustado de terceros.** Ni YouTube, ni Vimeo, ni mapas,
  ni publicaciones de redes. Los vídeos se sirven desde el propio dominio.
- **No hay fuentes externas.** La tipografía es la del sistema mientras no
  lleguen las licenciadas.
- **Instagram es solo un enlace**, no un widget: no instala nada.
- **El formulario no tiene backend.** La web es estática y
  `contactFormEndpoint` es `null`: el formulario prepara un borrador en el
  programa de correo del propio visitante, que lo envía desde su cuenta. La
  web no transmite ni almacena nada.
- **Único dato guardado en el navegador:** `colmilloIntroPlayed`
  (sessionStorage, valor `true`, se borra al cerrar la pestaña) para no
  repetir la animación de entrada.

Por eso **no se ha implementado banner de cookies**: no hay nada que consentir.
Si en el futuro se añade analítica, un embed o un endpoint de formulario, habrá
que implementar el consentimiento **antes** de activarlo y actualizar
`/cookies/`.

---

## Plantilla para enviar al cliente

```text
Para cerrar las páginas legales necesitamos:

1. Titular de la web
   - Nombre y apellidos o razón social:
   - NIF/CIF:
   - Domicilio completo:
   - ¿Autónomo o sociedad?:
   - Si es sociedad, datos del Registro Mercantil
     (registro, tomo, folio, hoja, inscripción):

2. Contacto
   - ¿La dirección correcta es hola@colmillostudio.com
     o hola@colmilloestudio.com?:
   - ¿Queréis publicar un teléfono? (opcional):

3. Privacidad
   - ¿Qué proveedor de correo usáis (Google Workspace, Microsoft 365,
     el del hosting del dominio, otro)?:
   - ¿Tenéis firmado el contrato de encargado del tratamiento con
     el proveedor de correo y con el hosting?:
   - ¿Cuánto tiempo queréis conservar los correos de contacto que no
     acaban en proyecto? (p. ej. 12 meses):

4. Dominio
   - Dominio definitivo de la web:
```
