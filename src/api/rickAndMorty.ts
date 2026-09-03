export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Paginated<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

const API_BASE = 'https://rickandmortyapi.com/api';

async function fetchFirstFive<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T[]> {
  const response = await fetch(`${API_BASE}/${path}/1,2,3,4,5`, { signal });
  if (!response.ok) {
    throw new Error(`Rick and Morty API error: ${response.status}`);
  }
  const data: T[] = await response.json();
  return data;
}

async function searchResource<T>(
  path: string,
  name: string,
  page: number,
  signal?: AbortSignal,
): Promise<Paginated<T>> {
  const params = new URLSearchParams({
    name,
    page: String(page),
  });
  const response = await fetch(`${API_BASE}/${path}/?${params}`, { signal });
  if (response.status === 404) {
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }
  if (!response.ok) {
    throw new Error(`Rick and Morty API error: ${response.status}`);
  }
  const data: Paginated<T> = await response.json();
  return data;
}

export async function getFirstFiveCharacters(
  signal?: AbortSignal,
): Promise<Character[]> {
  const response = await fetch(`${API_BASE}/character/1,2,3,4,5`, { signal });
  if (!response.ok) {
    throw new Error(`Rick and Morty API error: ${response.status}`);
  }
  const data: Character[] = await response.json();
  return data;
}

export function getFirstFiveEpisodes(signal?: AbortSignal): Promise<Episode[]> {
  return fetchFirstFive<Episode>('episode', signal);
}

export function getFirstFiveLocations(
  signal?: AbortSignal,
): Promise<Location[]> {
  return fetchFirstFive<Location>('location', signal);
}

export function searchCharacters(
  name: string,
  page: number,
  signal?: AbortSignal,
): Promise<Paginated<Character>> {
  return searchResource<Character>('character', name, page, signal);
}

export function searchEpisodes(
  name: string,
  page: number,
  signal?: AbortSignal,
): Promise<Paginated<Episode>> {
  return searchResource<Episode>('episode', name, page, signal);
}

export function searchLocations(
  name: string,
  page: number,
  signal?: AbortSignal,
): Promise<Paginated<Location>> {
  return searchResource<Location>('location', name, page, signal);
}
