# Checklist de un feature

Todo esto tiene que existir en `src/features/<feature>/`:

- [ ] `<Feature>Screen.tsx` en la raíz del feature (lógica + composición)
- [ ] `components/` con los subcomponentes propios
- [ ] `index.tsx` barrel: `export default` del Screen; named exports de card/list
- [ ] `App.tsx` importa desde `./features/<feature>`, nunca `./features/<feature>/...`
- [ ] Estilos con Tailwind; piezas globales en `src/components`

Referencia: `src/features/characters`.
