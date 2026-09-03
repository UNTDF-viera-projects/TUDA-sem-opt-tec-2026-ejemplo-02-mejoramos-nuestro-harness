interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Paginación"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="border border-neon-cyan/45 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan transition hover:bg-neon-cyan/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Anterior
      </button>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-neon-yellow">
        Página {page} de {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="border border-neon-cyan/45 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan transition hover:bg-neon-cyan/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Siguiente →
      </button>
    </nav>
  );
}
