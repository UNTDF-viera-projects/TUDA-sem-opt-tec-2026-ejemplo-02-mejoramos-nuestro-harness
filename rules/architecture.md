## Code Arquitectura

Cada feature vive en una carpeta dentro de `src/features/<feature>` con este esquema (ver `src/features/characters` como referencia):

- `<Feature>Screen.tsx`: pantalla principal del feature (lógica + composición). No se importa directamente desde afuera.
- `components/`: subcomponentes del feature (`<Thing>Card.tsx`, `<Thing>List.tsx`, etc.). Solo importan tipos de `src/api` vía ruta relativa (`../../../api/...`) y componentes globales de `src/components`.
- `index.tsx`: barrel que importa el screen y los subcomponentes y los re-exporta. El screen va como default export, los subcomponentes reutilizables (card, list) como named exports. Los consumidores externos (router, otros features) solo importan desde el barrel, nunca rutas internas.

Ejemplo:

```tsx
import CharactersScreen from './CharactersScreen';
import CharacterCard from './components/CharacterCard';
import CharacterList from './components/CharacterList';

export { CharacterCard, CharacterList };
export default CharactersScreen;
```

Solo los componentes realmente globales van en `src/components`. Hooks o servicios globales van en `src/hooks` y `src/services` respectivamente. Estilos globales en `src/styles`.
