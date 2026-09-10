---
name: implement
description: Implementar un cambio y no darlo por terminado hasta que el subagente reviewer lo verifique. Usar al implementar, cerrar una tarea, o /implement.
---

# implement

Si el cambio es un feature nuevo o hay que alinear uno existente, cargá la skill `add-feature` primero.

## Pasos

1. Implementá el cambio pedido.
2. Invocá el subagente `reviewer`. Él lee, corre `check-features` / `pnpm lint` / `pnpm format:check` / `pnpm build`, y te devuelve un informe.
3. Si el informe tiene issues abiertos, corregilos y volvé a invocar `reviewer`.
4. Informá que terminaste solo cuando el reviewer reporta cero issues abiertos.

El reviewer no edita. Los arreglos los hace este agente.
