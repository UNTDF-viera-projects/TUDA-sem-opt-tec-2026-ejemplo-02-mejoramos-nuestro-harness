import { useEffect, useState } from 'react';
import { getFirstFiveCharacters, type Character } from './api/rickAndMorty';
import CharacterCard from './components/CharacterCard';

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getFirstFiveCharacters(controller.signal);
        setCharacters(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  return (
    <div className="bg-cyber-page flex min-h-svh flex-col bg-void text-ice">
      <header className="relative overflow-hidden border-b border-neon-cyan/30 px-6 pb-8 pt-14 text-center">
        <p className="mb-3 font-mono text-xs tracking-[0.35em] text-neon-yellow">
          NIGHT CITY // C-137 ARCHIVE
        </p>
        <h1 className="text-glow-hero text-[clamp(2.4rem,7vw,4.5rem)] font-black uppercase leading-none tracking-wide text-white">
          Rick
          <span className="text-glow-cyan text-neon-cyan">_and_</span>
          Morty
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-mist">
          Primeros 5 sujetos del multiverso — directo desde{' '}
          <a
            href="https://rickandmortyapi.com/documentation"
            target="_blank"
            rel="noreferrer"
            className="text-neon-cyan underline underline-offset-[3px]"
          >
            rickandmortyapi.com
          </a>
        </p>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-cyan shadow-[0_0_20px_rgba(0,240,255,0.8)]"
        />
      </header>

      <main className="mx-auto box-border w-full max-w-6xl flex-1 px-6 py-10 pb-14">
        {loading && (
          <p
            role="status"
            className="border border-dashed border-neon-cyan/40 bg-neon-cyan/5 px-4 py-12 text-center font-mono uppercase tracking-[0.15em] text-neon-cyan"
          >
            Conectando con el multiverso…
          </p>
        )}

        {error && !loading && (
          <p
            role="alert"
            className="border border-dashed border-neon-pink/60 bg-neon-pink/5 px-4 py-12 text-center text-neon-pink"
          >
            Falló la conexión: {error}
          </p>
        )}

        {!loading && !error && (
          <section
            aria-label="Primeros cinco personajes"
            className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-items-center gap-7"
          >
            {characters.map((character, index) => (
              <CharacterCard
                key={character.id}
                character={character}
                index={index}
              />
            ))}
          </section>
        )}
      </main>

      <footer className="flex flex-wrap justify-between gap-3 border-t border-neon-yellow/35 bg-void/90 px-6 py-4 font-mono text-xs tracking-[0.2em] text-neon-yellow">
        <span>SYS.ONLINE</span>
        <span>5 UNITS LOADED</span>
        <span>CYB3RPUNK v1.0</span>
      </footer>
    </div>
  );
}
