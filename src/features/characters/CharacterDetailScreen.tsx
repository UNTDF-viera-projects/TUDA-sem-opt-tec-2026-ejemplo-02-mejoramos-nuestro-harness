import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getCharacterById, type Character } from '../../api/rickAndMorty';

const STATUS_STYLES: Record<Character['status'], string> = {
  Alive: 'border-neon-green text-neon-green',
  Dead: 'border-neon-pink text-neon-pink',
  unknown: 'border-neon-yellow text-neon-yellow',
};

const DOT_STYLES: Record<Character['status'], string> = {
  Alive: 'bg-neon-green',
  Dead: 'bg-neon-pink',
  unknown: 'bg-neon-yellow',
};

function episodeId(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1] || url;
}

export default function CharacterDetailScreen() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    async function load(characterId: string) {
      try {
        setLoading(true);
        setError(null);
        const data = await getCharacterById(characterId, controller.signal);
        setCharacter(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    void load(id);
    return () => controller.abort();
  }, [id]);

  if (!id) {
    return (
      <div>
        <p
          role="alert"
          className="border border-dashed border-neon-pink/60 bg-neon-pink/5 px-4 py-12 text-center text-neon-pink"
        >
          No se encontró la ficha: id desconocido
        </p>
        <Link
          to="/characters"
          className="mt-6 inline-block border border-neon-yellow px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-neon-yellow transition hover:bg-neon-yellow hover:text-void"
        >
          ← Volver a personajes
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <p
        role="status"
        className="border border-dashed border-neon-cyan/40 bg-neon-cyan/5 px-4 py-12 text-center font-mono uppercase tracking-[0.15em] text-neon-cyan"
      >
        Abriendo ficha del personaje…
      </p>
    );
  }

  if (error || !character) {
    return (
      <div>
        <p
          role="alert"
          className="border border-dashed border-neon-pink/60 bg-neon-pink/5 px-4 py-12 text-center text-neon-pink"
        >
          No se encontró la ficha: {error ?? `id ${id} desconocido`}
        </p>
        <Link
          to="/characters"
          className="mt-6 inline-block border border-neon-yellow px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-neon-yellow transition hover:bg-neon-yellow hover:text-void"
        >
          ← Volver a personajes
        </Link>
      </div>
    );
  }

  const idLabel = String(character.id).padStart(3, '0');
  const details: Array<[string, string]> = [
    ['Estado', character.status],
    ['Especie', character.species],
    ['Tipo', character.type || '—'],
    ['Género', character.gender],
    ['Origen', character.origin.name],
    ['Ubicación', character.location.name],
    ['Episodios', String(character.episode.length)],
  ];

  return (
    <div>
      <Link
        to="/characters"
        className="mb-6 inline-block border border-neon-cyan/45 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan transition hover:bg-neon-cyan/10"
      >
        ← Volver a personajes
      </Link>

      <article
        aria-label={`Ficha de ${character.name}`}
        className="clip-cyber relative overflow-hidden border border-neon-cyan/45 bg-cyber-card shadow-[0_0_0_1px_rgba(255,42,109,0.25),0_0_24px_rgba(0,240,255,0.25)]"
        data-testid={`character-detail-${character.id}`}
      >
        <div
          aria-hidden="true"
          className="bg-scanlines pointer-events-none absolute inset-0 z-10"
        />

        <div className="relative grid gap-0 md:grid-cols-[minmax(0,380px)_1fr]">
          <div className="relative aspect-square overflow-hidden border-b-2 border-neon-pink md:border-b-0 md:border-r-2">
            <img
              src={character.image}
              alt={character.name}
              width={400}
              height={400}
              className="h-full w-full object-cover contrast-110 saturate-125"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,2,33,0.85)_100%)]"
            />
            <span className="absolute left-3 top-3 z-20 bg-neon-yellow px-2 py-0.5 font-mono text-xs tracking-widest text-void shadow-[3px_3px_0_#ff2a6d]">
              #{idLabel}
            </span>
          </div>

          <div className="p-6 md:p-8">
            <p className="mb-1.5 font-mono text-xs tracking-[0.22em] text-neon-cyan">
              FICHA // C-137
            </p>
            <h2 className="text-glow-card mb-3 text-3xl font-black uppercase leading-tight text-white md:text-4xl">
              {character.name}
            </h2>
            <span
              className={`mb-6 inline-flex items-center gap-1.5 border bg-void/85 px-2 py-[3px] font-mono text-xs uppercase tracking-widest ${STATUS_STYLES[character.status]}`}
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full shadow-[0_0_8px_currentColor] ${DOT_STYLES[character.status]}`}
              />
              {character.status}
            </span>

            <dl className="grid gap-2 border border-dashed border-neon-cyan/40 bg-neon-cyan/5 p-4">
              {details.map(([term, value]) => (
                <div
                  key={term}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <dt className="font-mono text-xs uppercase tracking-widest text-neon-pink">
                    {term}
                  </dt>
                  <dd className="text-right text-ice">{value}</dd>
                </div>
              ))}
            </dl>

            {character.episode.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan">
                  Aparece en
                </p>
                <p className="font-mono text-xs leading-relaxed text-mist">
                  EP_{character.episode.map(episodeId).join(' · EP_')}
                </p>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
