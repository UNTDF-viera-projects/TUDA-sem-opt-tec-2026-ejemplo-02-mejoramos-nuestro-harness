import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  getFirstFiveCharacters,
  getFirstFiveEpisodes,
  getFirstFiveLocations,
  type Character,
  type Episode,
  type Location,
} from '../../api/rickAndMorty';
import EpisodeCard from '../../components/EpisodeCard';
import LocationCard from '../../components/LocationCard';
import { CharacterCard } from '../characters';
import { WeatherWidget } from '../weather';

interface SectionState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

const initialState = { data: [], loading: true, error: null };

function SectionHeader({
  title,
  to,
  count,
}: {
  title: string;
  to: string;
  count: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <h2 className="text-glow-card text-3xl font-black uppercase tracking-wide text-white">
        {title}
      </h2>
      <Link
        to={to}
        className="border border-neon-yellow px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-neon-yellow transition hover:bg-neon-yellow hover:text-void"
      >
        Ver todos → {count}
      </Link>
    </div>
  );
}

function SectionStatus({
  loading,
  error,
  label,
}: {
  loading: boolean;
  error: string | null;
  label: string;
}) {
  if (loading) {
    return (
      <p
        role="status"
        className="border border-dashed border-neon-cyan/40 bg-neon-cyan/5 px-4 py-8 text-center font-mono uppercase tracking-[0.15em] text-neon-cyan"
      >
        Conectando {label}…
      </p>
    );
  }
  if (error) {
    return (
      <p
        role="alert"
        className="border border-dashed border-neon-pink/60 bg-neon-pink/5 px-4 py-8 text-center text-neon-pink"
      >
        Falló la conexión ({label}): {error}
      </p>
    );
  }
  return null;
}

export default function Home() {
  const [characters, setCharacters] =
    useState<SectionState<Character>>(initialState);
  const [episodes, setEpisodes] = useState<SectionState<Episode>>(initialState);
  const [locations, setLocations] =
    useState<SectionState<Location>>(initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function load<T>(
      fetcher: (signal?: AbortSignal) => Promise<T[]>,
      setState: React.Dispatch<React.SetStateAction<SectionState<T>>>,
    ) {
      try {
        const data = await fetcher(controller.signal);
        setState({ data, loading: false, error: null });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setState({
          data: [],
          loading: false,
          error: err instanceof Error ? err.message : 'Error desconocido',
        });
      }
    }

    void load(getFirstFiveCharacters, setCharacters);
    void load(getFirstFiveEpisodes, setEpisodes);
    void load(getFirstFiveLocations, setLocations);
    return () => controller.abort();
  }, []);

  return (
    <div className="grid gap-14">
      <WeatherWidget />

      <section aria-label="Primeros cinco personajes">
        <SectionHeader title="Personajes" to="/characters" count="826" />
        <SectionStatus
          loading={characters.loading}
          error={characters.error}
          label="personajes"
        />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-items-center gap-7">
          {characters.data.map((character, index) => (
            <CharacterCard
              key={character.id}
              character={character}
              index={index}
            />
          ))}
        </div>
      </section>

      <section aria-label="Primeros cinco episodios">
        <SectionHeader title="Episodios" to="/episodes" count="51" />
        <SectionStatus
          loading={episodes.loading}
          error={episodes.error}
          label="episodios"
        />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-items-center gap-7">
          {episodes.data.map((episode, index) => (
            <EpisodeCard key={episode.id} episode={episode} index={index} />
          ))}
        </div>
      </section>

      <section aria-label="Primeras cinco ubicaciones">
        <SectionHeader title="Ubicaciones" to="/locations" count="126" />
        <SectionStatus
          loading={locations.loading}
          error={locations.error}
          label="ubicaciones"
        />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-items-center gap-7">
          {locations.data.map((location, index) => (
            <LocationCard key={location.id} location={location} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
