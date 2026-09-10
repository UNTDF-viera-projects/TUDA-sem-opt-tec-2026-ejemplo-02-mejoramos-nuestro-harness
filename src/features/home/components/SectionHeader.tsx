import { Link } from 'react-router';

interface SectionHeaderProps {
  title: string;
  to: string;
  count: string;
}

export default function SectionHeader({
  title,
  to,
  count,
}: SectionHeaderProps) {
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
