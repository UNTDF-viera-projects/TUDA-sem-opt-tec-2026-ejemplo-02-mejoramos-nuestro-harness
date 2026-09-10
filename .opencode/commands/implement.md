---
description: Implementá un cambio y no lo des por terminado hasta el review.
agent: build
---

Implementá

$ARGUMENTS

Antes de informar que terminaste:

1. Si es un feature nuevo o hay que alinear uno existente, seguí la skill `add-feature`.
2. Invocá el subagente `reviewer`. Él lee, corre checks y buildea; no edita.
3. Si el reviewer reporta issues abiertos, corregilos y volvé a invocarlo.
4. Informá que terminaste solo cuando el reviewer devuelva `pass`.
