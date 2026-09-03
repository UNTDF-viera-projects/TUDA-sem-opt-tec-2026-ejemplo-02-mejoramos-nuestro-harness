import { searchCharacters } from '../../api/rickAndMorty';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import { usePaginatedSearch } from '../../hooks/usePaginatedSearch';
import CharacterList from './components/CharacterList';

export default function CharactersScreen() {
  const { query, page, data, loading, error, setQuery, setPage } =
    usePaginatedSearch(searchCharacters);

  return (
    <div>
      <h2 className="text-glow-card mb-2 text-3xl font-black uppercase tracking-wide text-white">
        Personajes
      </h2>
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-mist">
        {data ? `${data.info.count} resultados` : 'Buscando en el multiverso…'}
      </p>

      <SearchBar
        label="Buscar por nombre"
        placeholder="Ej: Rick, Morty, Summer…"
        value={query}
        onChange={setQuery}
      />

      <div className="mt-8">
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

        {!loading && !error && data && data.results.length === 0 && (
          <p
            role="status"
            className="border border-dashed border-neon-yellow/60 bg-neon-yellow/5 px-4 py-12 text-center text-neon-yellow"
          >
            Sin resultados para &ldquo;{query}&rdquo;
          </p>
        )}

        {!loading && !error && data && data.results.length > 0 && (
          <CharacterList characters={data.results} offset={(page - 1) * 20} />
        )}
      </div>

      {data && (
        <Pagination
          page={page}
          totalPages={data.info.pages}
          onChange={setPage}
        />
      )}
    </div>
  );
}
