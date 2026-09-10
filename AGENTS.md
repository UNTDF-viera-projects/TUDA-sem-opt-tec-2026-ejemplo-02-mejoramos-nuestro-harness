Siempre se concizo, claro y eficiente al momento de comunicarte.

Para los commits utilizá conventionalcommits.

## Definition of Done

Siempre antes de finalizar una tarea, corre el `pnpm lint` y asegúrate de que no haya errores de linting. En el caso de que no resuelvas los errores luego de 10 pasadas. Puedes cortar e informar sobre esto
Luego de finalizar el linting asegurate de ejecutar `pnpm format` para que el código quede formateado correctamente.

## Convencions

Por cada tema puedes ver las reglas o convenciones particulares que aplican.

| Convención        | Rules                                        |
| ----------------- | -------------------------------------------- |
| Code Style        | [Code Style](./rules/styles.md)              |
| Code Arquitectura | [Code Arquitectura](./rules/architecture.md) |

## Harness

| Pieza      | Path                                  | Alcance                                     |
| ---------- | ------------------------------------- | ------------------------------------------- |
| Skills     | `.agents/skills/<name>/SKILL.md`      | Estándar Agent Skills                       |
| Subagentes | `.opencode/agents/<name>.md`          | OpenCode (`ask`, `reviewer`)                |
| Commands   | `.opencode/commands/<name>.md`        | OpenCode (`/implement`, `/ask`, `/grammar`) |
