# MEGA PROMPT MAESTRO - DISENO Y DESARROLLO DE LA WEB DE COLMILLO STUDIO

Lee completamente este documento antes de modificar ningun archivo.

Este documento reconstruye y consolida el briefing recibido para Colmillo Studio
y el analisis previo de la conversacion de referencia. Es la fuente principal
para construir la web, junto con los documentos vivos dentro de `docs/`.

## 1. Tu Papel

Actua simultaneamente como:

- Lead Creative Developer.
- Director de arte digital.
- Desarrollador frontend senior.
- Especialista en GSAP, ScrollTrigger y experiencias de scroll.
- Especialista en rendimiento web.
- Especialista en accesibilidad WCAG 2.2.
- Arquitecto de contenido y SEO tecnico.
- Responsable de control de calidad visual y funcional.

Tu mision es disenar y construir una web premium para Colmillo Studio.

No debes entregar una simple landing con animaciones decorativas. Debes construir
una experiencia de portfolio creativa, memorable, fluida, tecnicamente solida y
preparada para crecer.

La web debe transmitir creatividad, atrevimiento, caracter, movimiento, cuidado
editorial, profesionalidad y capacidad real de crear marcas y campanas
memorables.

La interaccion debe reforzar la identidad de Colmillo, no parecer una
demostracion generica de librerias de animacion.

## 2. Objetivo General

Construir una web de portfolio para Colmillo Studio tomando como referencia
conceptual:

- https://hellomonday.com
- https://www.mosaic.com
- https://beans.agency
- https://thatlot.co.uk

Estas webs deben utilizarse exclusivamente como referencias de comportamiento,
ritmo, composicion e interaccion.

Esta prohibido:

- copiar codigo de las referencias;
- copiar textos;
- copiar recursos visuales;
- copiar exactamente sus composiciones;
- copiar exactamente sus transiciones;
- reproducir sus timings pixel por pixel;
- crear una imitacion visual reconocible;
- utilizar imagenes o videos pertenecientes a esas agencias.

Extrae patrones de interaccion y reinterpretalos mediante un sistema original
basado en el universo conceptual de Colmillo:

- morder;
- dejar marca;
- presionar;
- comprimir;
- rasgar;
- arrugar;
- recortar;
- crear pequenas muescas;
- mostrar tension y liberacion;
- hacer que las superficies parezcan vivas.

El resultado debe sentirse inspirado por las referencias, pero inequivocamente
propio de Colmillo Studio.

## 3. Brief del Cliente

El cliente ha solicitado expresamente:

1. Una portada con una animacion en loop ocupando practicamente toda la primera
   pantalla.
2. Una experiencia general cercana en energia y movimiento a Hello Monday.
3. Un CTA con el texto exacto: "Haz que tu marca muerda".
4. Ese CTA debe llevar directamente a la zona de contacto.
5. Al abandonar visualmente el hero debe aparecer un encabezado fijo con accesos
   rapidos a correo electronico, Instagram y telefono.
6. Un puntero personalizado inspirado en Mosaic o Hello Monday.
7. Secciones que se superponen progresivamente, como si una tapara a la anterior.
8. Un menu minimalista situado en un lateral.
9. Una seccion de proyectos en la que el scroll vertical haga avanzar
   horizontalmente los trabajos.
10. Una animacion de despedida antes del footer.
11. Widgets, tarjetas o imagenes que reaccionen al cursor: se compriman, se
   deformen, se arruguen, se recojan o cambien ligeramente de forma.
12. Transiciones de pagina originales.
13. Fondo principal: `#fceeda`.
14. Naranja principal: `#cd5730`.
15. Tipografias previstas: Bootzy TM y More Sugar.
16. El manual de marca definitivo todavia no esta disponible.

## 4. Activos de Entrada

Activos esperados:

- logotipo actual de Colmillo Studio;
- animacion principal del hero;
- animacion de despedida;
- manual de marca definitivo;
- archivos webfont licenciados;
- textos definitivos;
- informacion de contacto;
- listado de servicios;
- listado de proyectos;
- imagenes y videos de cada proyecto;
- datos legales;
- perfiles sociales;
- dominio definitivo.

Activo disponible ahora:

- `public/assets/incoming/colmillo-logo-reference-white-bg.png`

Este archivo es una referencia raster con fondo blanco. No debe tratarse como
logotipo final de produccion si no existe version transparente o SVG oficial.

### Rutas Propuestas

Cuando los archivos esten disponibles, organizalos asi:

```text
public/
  assets/
    brand/
      colmillo-logo.svg
      colmillo-logo-dark.svg
      colmillo-logo-light.svg
      favicon.svg
    fonts/
      bootzy/
      more-sugar/
    motion/
      hero/
        hero-source.gif
        hero-desktop.webm
        hero-desktop.mp4
        hero-mobile.webm
        hero-mobile.mp4
        hero-poster.webp
      goodbye/
        goodbye-source.gif
        goodbye.webm
        goodbye.mp4
        goodbye-poster.webp
    projects/
      proyecto-slug/
```

### Normas Sobre Activos

- No enlaces en produccion directamente a SwissTransfer.
- No cargues el GIF desde una URL temporal.
- No descargues tipografias de paginas no oficiales.
- No publiques tipografias sin licencia web.
- No fabriques logos alternativos sin aprobacion.
- No recortes "studio" del logotipo para crear una version compacta.
- No vectorices automaticamente el logotipo final sin revision.
- No inventes fotografias, marcas, clientes o proyectos.
- No dejes enlaces con `href="#"`.
- No muestres imagenes rotas.
- No publiques placeholders visibles en produccion.

Si un activo todavia no existe:

1. Crea la arquitectura necesaria.
2. Anadelo a `docs/CONTENT_NEEDED.md`.
3. Utiliza un placeholder tecnico claramente marcado solo en desarrollo.
4. Excluye el contenido de demostracion de la compilacion de produccion.
5. Continua trabajando en lo que no dependa del activo.

## 5. Primera Accion: Auditoria del Repositorio

Antes de escribir codigo:

1. Comprueba la ruta actual.
2. Ejecuta `git status --short`.
3. Detecta si existen cambios sin confirmar.
4. Identifica el gestor de paquetes mediante su lockfile.
5. Lee `README.md`, `AGENTS.md`, `package.json` si existe, configuracion de
   framework, TypeScript, lint, variables documentadas, componentes, estilos,
   rutas y scripts existentes.
6. Ejecuta la aplicacion y comprobaciones actuales si el proyecto ya contiene
   una app.
7. Documenta cualquier error preexistente.
8. No sobrescribas configuraciones existentes sin entenderlas.
9. No elimines archivos que no hayas creado.
10. No uses `git reset --hard`, `git clean -fd`, `rm -rf` sobre carpetas del
    proyecto, comandos que borren archivos de usuario ni sobrescrituras de
    `.env`.
11. Conserva el historial y el estilo del repositorio.

### Si el Repositorio Esta Vacio

Crea un nuevo proyecto con:

- Astro, ultima version estable.
- TypeScript en modo estricto.
- salida estatica por defecto.
- npm, salvo que exista otro gestor definido.
- CSS nativo organizado por capas.
- Astro Content Collections.
- integracion de sitemap.
- GSAP.
- ScrollTrigger.
- Lenis solo donde aporte valor real.
- Playwright para pruebas end-to-end.
- ESLint y Prettier si no existen herramientas equivalentes.

Anade React unicamente si aparece una necesidad real de estado complejo. No
conviertas toda la web en una SPA React sin justificacion.

## 6. Arquitectura Tecnica Predeterminada

Utiliza:

- Astro.
- TypeScript estricto.
- HTML semantico renderizado en servidor o estaticamente.
- Content Collections para proyectos.
- CSS nativo.
- GSAP y ScrollTrigger para movimiento complejo.
- Lenis unicamente donde aporte valor real.
- Astro ClientRouter para transiciones internas si el proyecto lo permite.
- JavaScript modular y progresivamente mejorado.

Principios:

- HTML funcional antes de ejecutar JavaScript.
- Enlaces reales antes de anadir scroll animado.
- Navegacion funcional antes de anadir transiciones.
- Contenido indexable fuera de canvas.
- Movimiento como mejora progresiva.
- Fallbacks estaticos en movil y con movimiento reducido.
- Dependencias minimas.
- Ninguna animacion debe impedir leer, navegar o contactar.

No instalar inicialmente:

- Three.js.
- PixiJS.
- React para toda la web.
- Framer Motion.
- Locomotive Scroll.
- Barba.js.
- jQuery.
- dos librerias diferentes de smooth scroll.
- librerias completas de iconos.
- grandes sistemas de UI.
- Tailwind, salvo que el repositorio ya lo utilice.
- un CMS externo sin que se haya solicitado.

Primero reproduce la sensacion con CSS, SVG, GSAP y transformaciones 2D.

Solamente considera WebGL para una interaccion concreta si existe una diferencia
visual importante, la solucion CSS no alcanza el resultado, se mantiene el
presupuesto de rendimiento, hay fallback, se desactiva en dispositivos modestos
y no se usa para contenido esencial.

## 7. Estructura Propuesta de App

Adapta nombres si el repositorio ya tiene convenciones equivalentes.

```text
src/
  components/
    layout/
      SiteHeader.astro
      SideMenu.astro
      Footer.astro
      MotionControls.astro
      SeoHead.astro
    sections/
      HeroSection.astro
      IntroSection.astro
      ServicesSection.astro
      ProjectsHorizontal.astro
      StudioSection.astro
      GoodbyeSection.astro
      ContactSection.astro
    projects/
      ProjectCard.astro
      ProjectTrack.astro
      ProjectHero.astro
      ProjectGallery.astro
      NextProject.astro
    ui/
      BiteButton.astro
      MagneticLink.astro
      ContactIconLink.astro
      SectionHeading.astro
      MediaFrame.astro
      ProgressIndicator.astro
  layouts/
    BaseLayout.astro
    ProjectLayout.astro
    LegalLayout.astro
  pages/
    index.astro
    proyectos/
      [slug].astro
    contacto.astro
    aviso-legal.astro
    privacidad.astro
    cookies.astro
    404.astro
  content/
    projects/
  config/
    site.ts
    navigation.ts
    contact.ts
    motion.ts
  scripts/
    motion/
      MotionController.ts
      SmoothScroll.ts
      CustomCursor.ts
      HeroMotion.ts
      StickyHeader.ts
      SideMenu.ts
      SectionStack.ts
      HorizontalProjects.ts
      MagneticElements.ts
      PageTransitions.ts
      MotionPreference.ts
  styles/
    reset.css
    tokens.css
    fonts.css
    globals.css
    typography.css
    layout.css
    utilities.css
    motion.css
    reduced-motion.css
  content.config.ts
docs/
  IMPLEMENTATION_PLAN.md
  CONTENT_NEEDED.md
  MOTION_SPEC.md
  CONTENT_MODEL.md
  QA_CHECKLIST.md
  PERFORMANCE_BUDGET.md
  DEPLOYMENT.md
  DECISIONS.md
tests/
  e2e/
```

Separacion de responsabilidades:

- Las clases CSS controlan la apariencia.
- Los atributos `data-*` actuan como hooks de JavaScript.
- Los scripts de animacion no deben depender de clases puramente visuales.
- Los componentes no deben contener grandes timelines GSAP inline.
- La informacion de contacto debe estar centralizada.
- Los colores deben proceder de tokens.
- Los proyectos deben proceder de datos estructurados.
- No dupliques datos entre componentes.

## 8. Sistema de Diseno

Tokens iniciales:

```css
:root {
  --color-brand-cream: #fceeda;
  --color-brand-orange: #cd5730;
  --color-brand-orange-aa: #b54d2a;
  --color-brand-ink: #12100f;
  --color-brand-ink-soft: #2a211d;
  --color-brand-cream-deep: #ead2b4;
  --color-white: #ffffff;

  --color-background: var(--color-brand-cream);
  --color-text: var(--color-brand-ink);
  --color-accent: var(--color-brand-orange);
}
```

Reglas de contraste:

- Usa `#cd5730` principalmente para titulares grandes, palabras destacadas,
  grandes numeros, botones con tamano suficiente, elementos decorativos, bordes
  gruesos y fondos amplios con texto oscuro.
- No uses `#cd5730` para parrafos pequenos sobre `#fceeda`.
- Para texto pequeno naranja usa provisionalmente `#b54d2a`.
- Para textos largos usa `#12100f`.
- Comprueba todos los pares con una herramienta de contraste.
- No dependas solo del color para comunicar estados.

Tipografia:

- Bootzy TM: H1, H2 principales, titulares de proyectos, CTA protagonista y
  grandes palabras animadas.
- More Sugar: notas manuscritas, pequenos comentarios, etiquetas editoriales,
  subrayados o palabras puntuales. Nunca parrafos largos.
- Texto de lectura: `system-ui`, sans-serif como fallback provisional.

Normas tipograficas:

- No simules Bootzy o More Sugar con una fuente parecida en produccion.
- Configura `font-display: swap`.
- Sirve unicamente WOFF2 licenciados.
- Precarga solo el peso realmente utilizado en el primer viewport.
- Conserva texto seleccionable e indexable.
- Prueba tildes, enes, signos de apertura y caracteres espanoles.

Escala orientativa:

```css
--font-display-xl: clamp(4.2rem, 11vw, 11.5rem);
--font-display-lg: clamp(3.2rem, 8vw, 8rem);
--font-heading: clamp(2.2rem, 5vw, 5rem);
--font-body-lg: clamp(1.2rem, 1.8vw, 1.75rem);
--font-body: clamp(1rem, 1.1vw, 1.2rem);
--font-label: clamp(0.75rem, 0.8vw, 0.9rem);
```

No apliques estos valores ciegamente. Ajustalos despues de cargar las fuentes
reales.

Espaciado orientativo:

```css
--page-gutter: clamp(1rem, 3vw, 3.5rem);
--section-space: clamp(5rem, 12vw, 11rem);
--section-radius: clamp(1.5rem, 4vw, 4.5rem);
--header-height: clamp(3.75rem, 5vw, 4.75rem);
--menu-rail-width: clamp(2.75rem, 4vw, 4.5rem);
```

Gramatica visual:

- grandes superficies limpias;
- titulares de gran escala;
- contraste entre letras organicas y estructura editorial;
- bordes y muescas inspirados en mordiscos;
- recortes suaves y no infantiles;
- pocas sombras;
- ausencia de degradados genericos;
- ritmo visual amplio;
- elementos superpuestos;
- imagenes tratadas como materia flexible;
- detalles manuscritos colocados con moderacion.

Evita estetica SaaS, tarjetas genericas con sombra, capsulas por todas partes,
gradientes tecnologicos, exceso de blur, movimiento sin proposito, efectos
distintos en cada seccion e interfaz recargada.

## 9. Tratamiento del Logotipo

El logotipo actual combina:

- "COLMILLO" con formas negras, gruesas, redondeadas e irregulares.
- "studio" con un estilo fino y editorial.
- Una composicion horizontal dentro de un lienzo cuadrado blanco.

La version raster actual no debe utilizarse directamente sobre el fondo crema si
conserva el rectangulo blanco.

Procedimiento:

1. Comprueba si existe version SVG o PNG transparente.
2. Si existe, usala.
3. Si solo existe el PNG blanco, crea unicamente una version provisional
   transparente, conserva bordes y proporciones, no redibujes letras y documenta
   que debe sustituirse por arte oficial.
4. No inventes un isotipo.
5. No uses solo una "C" salvo aprobacion.
6. No recortes la palabra "studio".
7. Mantén area de seguridad suficiente.
8. No distorsiones el logotipo durante animaciones.

## 10. Experiencia de Usuario

### Hero

Debe ocupar casi toda la primera pantalla. Debe contener:

- animacion principal en loop;
- presencia clara de Colmillo;
- CTA "Haz que tu marca muerda";
- indicacion sutil de continuidad hacia el resto de la pagina;
- control o fallback para usuarios con movimiento reducido.

La animacion de entrada debe ser video optimizado en produccion, no GIF pesado.
Genera WebM/MP4 y poster cuando exista el archivo fuente.

### Encabezado Fijo

Al salir visualmente del hero, aparece un encabezado fijo con accesos a correo,
Instagram y telefono. Debe ser discreto, util y accesible.

No inventes los datos. Usa placeholders solo en desarrollo y registralos en
`docs/CONTENT_NEEDED.md`.

### Menu Lateral

Minimalista, lateral y persistente donde tenga sentido. Debe funcionar con
teclado, lector de pantalla, puntero fino y tactil.

### Secciones Superpuestas

Las secciones deben cubrirse unas a otras durante el scroll con sensacion de
capas fisicas. Mantener lectura clara, orden DOM logico y fallbacks en movil.

### Proyectos Horizontales

La seccion de proyectos debe convertir scroll vertical en avance horizontal. El
contenido debe seguir siendo navegable sin JavaScript, con teclado y con
movimiento reducido.

### Goodbye

Antes del footer debe existir una animacion de despedida. No usar el GIF final
hasta que el cliente entregue el activo real.

### Contacto

La zona de contacto debe ser directa, visible y no dependiente de efectos.
Mantener el CTA principal y enlaces reales.

## 11. Movimiento e Interaccion

El sistema de movimiento se basa en:

- reaccion magnetica sutil;
- presion al hover;
- deformacion elastica;
- muescas y mordidas mediante masks o clip paths;
- scroll narrativo;
- solapamiento de secciones;
- transiciones entre paginas con identidad propia.

Reglas:

- Ninguna animacion debe bloquear contenido.
- Toda animacion larga debe respetar `prefers-reduced-motion`.
- Evitar loops permanentes innecesarios.
- En tactil, sustituir hover por estados de entrada/salida, foco o scroll.
- No depender del cursor personalizado para comprender interacciones.

## 12. Contenido y SEO

Crear arquitectura preparada para:

- Home.
- Proyectos.
- Pagina de proyecto.
- Contacto.
- Aviso legal.
- Privacidad.
- Cookies.
- 404.

SEO tecnico:

- titulos y descripciones unicas;
- `og:image` cuando haya assets reales;
- sitemap;
- robots apropiado;
- URLs limpias;
- contenido indexable;
- datos estructurados solo cuando sean verdaderos.

No inventes claims comerciales. Si falta informacion, registrala.

## 13. Accesibilidad

Cumplir como minimo:

- HTML semantico.
- Navegacion por teclado.
- Foco visible.
- Estados hover/focus equivalentes.
- `prefers-reduced-motion`.
- Contraste suficiente.
- Labels para iconos de contacto.
- Botones reales para acciones.
- Enlaces reales para navegacion.
- Orden DOM coherente con el orden visual.

Evita parallax o transformaciones que dificulten la lectura. El sitio debe
funcionar sin JavaScript esencial.

## 14. Rendimiento

Objetivos iniciales:

- LCP movil inferior a 2.5 s en condiciones razonables.
- CLS inferior a 0.1.
- JS inicial lo mas bajo posible.
- Imagenes y videos con dimensiones definidas.
- Animaciones basadas en transform/opacity siempre que se pueda.
- Video hero optimizado, sin GIF pesado en produccion.

Medir con Lighthouse, Playwright y herramientas de navegador cuando exista app.

## 15. Plan de Implementacion

Fase 0: preparacion.

- Verificar repositorio.
- Crear estructura base si esta vacio.
- Confirmar gestor de paquetes.
- Registrar activos faltantes.

Fase 1: cimientos.

- Astro + TypeScript estricto.
- Tokens de diseno.
- Layout base.
- SEO base.
- Rutas esenciales.
- Datos centralizados.

Fase 2: home funcional sin efectos complejos.

- Hero.
- Intro.
- Servicios.
- Proyectos.
- Studio.
- Goodbye placeholder.
- Contacto.

Fase 3: sistema de movimiento.

- controlador de preferencias.
- cursor personalizado.
- menu lateral.
- encabezado al salir del hero.
- secciones superpuestas.
- proyectos horizontales.
- interacciones magneticas/deformables.

Fase 4: contenido y activos reales.

- conversion de GIF a video.
- logos oficiales.
- fuentes licenciadas.
- proyectos reales.
- datos legales y contacto.

Fase 5: QA y endurecimiento.

- responsive completo.
- accesibilidad.
- rendimiento.
- tests.
- build produccion.
- revision visual.

Fase 6: preparacion de despliegue.

- documentar variables.
- preparar estrategia de hosting.
- no desplegar sin autorizacion explicita.

## 16. Validacion Requerida

Antes de declarar una fase completa:

- ejecutar checks disponibles;
- revisar navegador real;
- probar desktop y movil;
- revisar consola;
- revisar movimiento reducido;
- actualizar `docs/EXECUTION_STATE.md`;
- actualizar `docs/DECISIONS.md` y `docs/CONTENT_NEEDED.md` si aplica.

## 17. Instruccion Inicial Recomendada Para Codex

Cuando quieras iniciar la construccion, abre Codex desde la raiz del proyecto y
usa:

```text
Lee AGENTS.md y COLMILLO_BUILD_SPEC.md completamente. Revisa docs/EXECUTION_STATE.md, docs/DECISIONS.md y docs/CONTENT_NEEDED.md. Haz la auditoria inicial del repositorio y empieza la Fase 0/1: si el repositorio esta vacio, crea la base Astro con TypeScript estricto, estructura limpia, tokens de marca, rutas esenciales y documentacion actualizada. No hagas push ni despliegue.
```

FIN DEL MEGA PROMPT.
