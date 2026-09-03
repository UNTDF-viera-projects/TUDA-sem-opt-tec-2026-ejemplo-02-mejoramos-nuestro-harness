import type { Character } from '../../../api/rickAndMorty';
import CharacterCard from './CharacterCard';

interface CharacterListProps {
  characters: Character[];
  offset?: number;
}

export default function CharacterList({
  characters,
  offset = 0,
}: CharacterListProps) {
  return (
    <section
      aria-label="Personajes"
      className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-items-center gap-7"
    >
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          index={offset + index}
        />
      ))}
    </section>
  );
}
