import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Characters, { CharacterDetailScreen } from './features/characters';
import Episodes from './features/episodes';
import Home from './features/home';
import Locations from './features/locations';

function NotFound() {
  return (
    <p
      role="alert"
      className="border border-dashed border-neon-pink/60 bg-neon-pink/5 px-4 py-12 text-center text-neon-pink"
    >
      404 — Señal perdida en el multiverso
    </p>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="characters" element={<Characters />} />
          <Route path="characters/:id" element={<CharacterDetailScreen />} />
          <Route path="episodes" element={<Episodes />} />
          <Route path="locations" element={<Locations />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
