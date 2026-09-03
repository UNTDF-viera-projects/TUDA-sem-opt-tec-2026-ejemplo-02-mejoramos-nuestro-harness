import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import type { Paginated } from '../api/rickAndMorty';
import { useDebouncedValue } from './useDebouncedValue';

type SearchFn<T> = (
  name: string,
  page: number,
  signal?: AbortSignal,
) => Promise<Paginated<T>>;

export function usePaginatedSearch<T>(searchFn: SearchFn<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const debouncedQuery = useDebouncedValue(query);

  const [data, setData] = useState<Paginated<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const result = await searchFn(debouncedQuery, page, controller.signal);
        setData(result);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, [searchFn, debouncedQuery, page]);

  function setQuery(next: string) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (next) params.set('q', next);
      else params.delete('q');
      params.delete('page');
      return params;
    });
  }

  function setPage(next: number) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(next));
      if (query) params.set('q', query);
      return params;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return { query, page, data, loading, error, setQuery, setPage };
}
