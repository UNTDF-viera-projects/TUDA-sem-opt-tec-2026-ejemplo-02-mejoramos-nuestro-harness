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

const API_BASE = 'https://rickandmortyapi.com/api';

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
