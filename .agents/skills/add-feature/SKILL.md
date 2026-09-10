---
name: add-feature
description: Crear o migrar un feature al esquema de src/features/characters (Screen, components/, barrel y ruta). Usar al agregar un feature, alinear episodes/locations, o armar una pantalla nueva.
---

# add-feature

Seguí [rules/architecture.md](../../../rules/architecture.md). Referencia viva: `src/features/characters`. Checklist: [references/checklist.md](references/checklist.md).

## Pasos

1. Nombrar el feature en kebab-case (`quotes`, `episodes`) y crear `src/features/<feature>/`.
2. Extraer la pantalla a `<Feature>Screen.tsx` en la raíz del feature. No se importa desde afuera.
3. Mover subcomponentes propios a `components/` (`<Thing>Card.tsx`, `<Thing>List.tsx`). Tipos de API por ruta relativa (`../../../api/...`). UI compartida desde `src/components`.
4. Barrel en `index.tsx`: default export del Screen; named exports de card/list reutilizables.
5. En `src/App.tsx` importar solo desde el barrel y registrar la ruta.
6. Reusar `SearchBar`, `Pagination` y `usePaginatedSearch` si el feature lista y busca.

Listo cuando el checklist está cubierto y los consumidores externos no importan rutas internas del feature.
