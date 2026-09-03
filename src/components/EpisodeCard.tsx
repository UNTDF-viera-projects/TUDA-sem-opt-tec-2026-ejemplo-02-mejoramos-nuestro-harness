import type { Episode } from '../api/rickAndMorty';

interface EpisodeCardProps {
  episode: Episode;
  index?: number;
}

export default function EpisodeCard({ episode, index }: EpisodeCardProps) {
  const idLabel = String(episode.id).padStart(3, '0');
  const meta: Array<[string, string]> = [
    ['Código', episode.episode],
    ['Estreno', episode.air_date],
    ['Personajes', String(episode.characters.length)],
  ];

  return (
    <article
      className="clip-cyber group relative w-full max-w-80 overflow-hidden border border-neon-cyan/45 bg-cyber-card p-4 pb-5 text-left shadow-[0_0_0_1px_rgba(255,42,109,0.25),0_0_24px_rgba(0,240,255,0.25)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_0_1px_rgba(249,240,2,0.6),0_0_34px_rgba(255,42,109,0.45)]"
      data-testid={`episode-card-${episode.id}`}
    >
      <span className="mb-2 inline-block bg-neon-yellow px-2 py-0.5 font-mono text-xs tracking-widest text-void shadow-[3px_3px_0_#ff2a6d]">
        #{idLabel}
      </span>
      {index !== undefined && (
        <p className="mb-1.5 font-mono text-xs tracking-[0.22em] text-neon-cyan">
          EP_{index + 1} // C-137
        </p>
      )}
      <h3 className="text-glow-card mb-3.5 text-2xl uppercase leading-tight text-white">
        {episode.name}
      </h3>
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
    </article>
  );
}
