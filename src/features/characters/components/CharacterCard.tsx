import type { Character } from '../../../api/rickAndMorty';

interface CharacterCardProps {
  character: Character;
  index: number;
}

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

export default function CharacterCard({
  character,
  index,
}: CharacterCardProps) {
  const idLabel = String(character.id).padStart(3, '0');
  const meta: Array<[string, string]> = [
    ['Especie', character.species],
    ['Género', character.gender],
    ['Origen', character.origin.name],
  ];

  return (
    <article
      className="clip-cyber group relative w-full max-w-80 overflow-hidden border border-neon-cyan/45 bg-cyber-card shadow-[0_0_0_1px_rgba(255,42,109,0.25),0_0_24px_rgba(0,240,255,0.25),inset_0_0_32px_rgba(0,240,255,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_0_1px_rgba(249,240,2,0.6),0_0_34px_rgba(255,42,109,0.45),0_0_60px_rgba(0,240,255,0.3)]"
      data-testid={`character-card-${character.id}`}
    >
      <div
        aria-hidden="true"
        className="bg-scanlines pointer-events-none absolute inset-0 z-10"
      />

      <div className="relative aspect-square overflow-hidden border-b-2 border-neon-pink">
        <img
          src={character.image}
          alt={character.name}
          loading="lazy"
          width={300}
          height={300}
          className="h-full w-full object-cover contrast-110 saturate-125"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,2,33,0.85)_100%)]"
        />
        <span className="absolute left-2.5 top-2.5 z-20 bg-neon-yellow px-2 py-0.5 font-mono text-xs tracking-widest text-void shadow-[3px_3px_0_#ff2a6d]">
          #{idLabel}
        </span>
        <span
          className={`absolute right-2.5 top-2.5 z-20 inline-flex items-center gap-1.5 border bg-void/85 px-2 py-[3px] font-mono text-xs uppercase tracking-widest ${STATUS_STYLES[character.status]}`}
        >
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full shadow-[0_0_8px_currentColor] ${DOT_STYLES[character.status]}`}
          />
          {character.status}
        </span>
      </div>

      <div className="p-4 pb-5 text-left">
        <p className="mb-1.5 font-mono text-xs tracking-[0.22em] text-neon-cyan">
          UNIT_{index + 1} // C-137
        </p>
        <h2 className="text-glow-card mb-3.5 text-2xl uppercase leading-tight text-white">
          {character.name}
        </h2>

        <dl className="grid gap-2 border border-dashed border-neon-cyan/40 bg-neon-cyan/5 p-3">
          {meta.map(([term, value]) => (
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
      </div>
    </article>
  );
}
