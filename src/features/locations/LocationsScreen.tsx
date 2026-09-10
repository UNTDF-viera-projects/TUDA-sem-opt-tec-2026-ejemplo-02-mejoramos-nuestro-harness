import { searchLocations } from '../../api/rickAndMorty';
import LocationCard from '../../components/LocationCard';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import { usePaginatedSearch } from '../../hooks/usePaginatedSearch';

export default function LocationsScreen() {
  const { query, page, data, loading, error, setQuery, setPage } =
    usePaginatedSearch(searchLocations);

  return (
    <div>
      <h2 className="text-glow-card mb-2 text-3xl font-black uppercase tracking-wide text-white">
        Ubicaciones
      </h2>
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-mist">
        {data ? `${data.info.count} resultados` : 'Buscando en el multiverso…'}
      </p>

      <SearchBar
        label="Buscar por nombre"
        placeholder="Ej: Earth, Citadel…"
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
          <section
            aria-label="Ubicaciones"
            className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-items-center gap-7"
          >
            {data.results.map((location, index) => (
              <LocationCard
                key={location.id}
                location={location}
                index={(page - 1) * 20 + index}
              />
            ))}
          </section>
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
