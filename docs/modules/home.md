# Módulo home

## Alcance

Landing pública y estática en `/`. Referencias: `brief/home-desktop.png`, `brief/home-mobile.png`, `brief/structure.md`. `HomeView` compone las siete secciones completas más barra, pie y contacto flotante.

## Entidades

- `HeroTechnology`: `name`, `facet`, anillo, ángulo, profundidad y posición estática por viewport.
- `HeroCard`: claves i18n de antetítulo, título y detalle.
- `ExperienceStage`: id, empresa, claves i18n de periodo/cargo/descripción, etiquetas y cargos opcionales, más marcadores de etapa actual o emprendimiento.
- `ExperienceMetric`: id y clave i18n de cada cifra derivada.
- `ExperienceViewModel`: forma traducida que consumen la tarjeta actual y el panel cronológico.

No hay endpoints, DTO, adapter, servicio ni store: el contenido es local y estático. Experiencia deriva sus cifras y orden desde `experienceStages`; el único estado de su panel pertenece a `UiDrawer`. La isla de órbita conserva únicamente estado efímero de viewport y visibilidad, mientras el avance por frame vive en `MotionValue`.

## Pantalla y componentes

| Sección            | Estado                  | Ark UI   | Criterio principal                                                                         |
| ------------------ | ----------------------- | -------- | ------------------------------------------------------------------------------------------ |
| Hero               | animada, en revisión    | —        | Un solo `h1`; trece tecnologías y órbita Motion progresiva                                 |
| Pregúntale a Henry | construida, en revisión | Tabs     | Cinco preguntas con respuesta; cuatro son provisionales (decisión del usuario, 2026-10-07) |
| Stack              | construida, en revisión | —        | Tres facetas y superficie oscura                                                           |
| Experiencia        | rediseñada, en revisión | Drawer   | Tres cifras, cargo actual, trayectoria completa y Educación                                |
| Portafolio         | construida, en revisión | Carousel | Seis proyectos; sin enlace hasta confirmación                                              |
| Sobre mí           | construida, en revisión | —        | Sin teléfono, ciudad ni edad                                                               |
| Cierre             | construida, en revisión | —        | WhatsApp cuando existe; `mailto:` como respaldo                                            |

## Contrato preparado para animación

- `data-motion-section="hero|question|stack|experience|portfolio|about|closing"` identifica cada unidad de escena.
- `data-motion-section="header|footer|floating-contact"` identifica las piezas globales sin imponer una implementación de movimiento.
- Hero: `hero-copy`, `hero-card`, `hero-orbit` y una instancia `hero-pill` por tecnología. Cada píldora conserva `data-ring`, `data-angle` y `data-depth`.
- Pregunta: `assistant-panel`.
- Stack: `stack-illustration`, una instancia `stack-card` por faceta y `stack-bars`.
- Experiencia: `experience-stats`, una instancia `experience-stat` por cifra, `experience-current` y `experience-journey`.
- Portafolio: una instancia `portfolio-project` por proyecto, `portfolio-carousel`, una instancia `portfolio-built` por logro y `portfolio-built-icon` por icono.
- Sobre mí: `about-quote` y `about-contact`.
- Cierre: `closing-orbit`.
- `motion-builder` no debe cambiar contenido ni semántica. Decide HyperFrames o Motion y debe respetar `prefers-reduced-motion`.
- La órbita del Hero está implementada con Motion: se detiene fuera de vista, con la pestaña oculta y al interactuar con una píldora; en móvil y con movimiento reducido conserva el estado estático renderizado por servidor. Las tarjetas flotan y el indicador de disponibilidad pulsa bajo el mismo criterio de movimiento reducido.
- El resto de piezas aún no contiene animaciones: todo su contenido se ve en estado final desde el HTML.

### Piezas reemplazables

Cada pieza está aislada de la estructura y el contenido de su sección. Un reemplazo futuro conserva su atributo `data-motion-item` y el estado final visible sin animación.

| Componente           | Archivo                                              | Sustitución prevista en `media.md`                                                                                                                                                                                        |
| -------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HeroOrbit`          | `src/modules/home/components/HeroOrbit.tsx`          | En escritorio se muestra `hero-orbita.webm` (HyperFrames) con `AppLoopVideo`; `HeroOrbit` se conserva completo y sigue siendo la versión de móvil. `heroVisual` en `content/hero.content.ts` elige `"video"` u `"orbit"`. |
| `StackIllustration`  | `src/modules/home/components/StackIllustration.tsx`  | Muestra `stack-tres-cuerpos.webm` (HyperFrames) con `AppLoopVideo`. `stackVisual` en `content/home.content.ts` elige `"video"` o `"illustration"` (la ilustración fija anterior).                                         |
| — (pieza retirada)   | —                                                    | `trayectoria.webm` ya no aplica: la curva fue sustituida por “Cifras y panel”.                                                                                                                                            |
| `ClosingOrbit`       | `src/modules/home/components/ClosingOrbit.tsx`       | Órbita de línea animada en código.                                                                                                                                                                                        |
| `PortfolioBuiltIcon` | `src/modules/home/components/PortfolioBuiltIcon.tsx` | Gestos y halo animados en código o una alternativa gratuita de LottieFiles.                                                                                                                                               |

## Aceptación

- Responsive fiel a las dos referencias en 767 px.
- Textos redactados exclusivamente en `locales/es.json`; estructura en `content/`.
- Server Components salvo las islas `AppLoopVideo`, `HeroOrbit`, `HeroFloatingCard`, `HeroAvailabilityBadge`, `QuestionTabs`, `AppMobileMenu` y los wrappers `UiTabs`, `UiCarousel`, `UiDrawer` y `UiTooltip`.
- Solo tokens de `theme.css`, sin imports directos de Ark UI en el módulo.
- Experiencia mantiene la trayectoria completa en el HTML inicial con `UiDrawer` no perezoso; sus seis etapas se muestran en orden cronológico inverso y BlueX como bloque independiente.
- Foco atrapado, Escape, cierre exterior y restauración del foco quedan a cargo de Ark Dialog.

## Pendientes de contenido

Enlaces de proyectos, descripción de Agencia, cargo/fechas de BlueX, revisión de las cuatro respuestas provisionales del asistente y dominio definitivo.
