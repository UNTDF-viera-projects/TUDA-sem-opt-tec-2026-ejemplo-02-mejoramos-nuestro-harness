Siempre se concizo, claro y eficiente al momento de comunicarte.

Para los commits utilizá conventionalcommits.

## Definition of Done

Siempre antes de finalizar una tarea, corre el `pnpm lint` y asegúrate de que no haya errores de linting. En el caso de que no resuelvas los errores luego de 10 pasadas. Puedes cortar e informar sobre esto
Luego de finalizar el linting asegurate de ejecutar `pnpm format` para que el código quede formateado correctamente.

## Code Style

Para el manejo de los estilos usamos tailwindcss. En caso de necesitarlo creamos componentes dentro de src/components.

## Code Arquitectura
Cada feature debe estar en carpeta dentro de src/features. Dentro de cada feature debe haber un archivo index.tsx que exporte el componente principal de la feature. En caso de necesitar subcomponentes, estos deben estar dentro de la carpeta de la feature. También puede contener componentes específicos, hooks y servicios de esa feature.

Solo los componentes globales deben estar dentro de src/components. En caso de necesitar un hook o servicio global, estos deben estar dentro de src/hooks y src/services respectivamente. También los estilos globales deben estar dentro de src/styles.
