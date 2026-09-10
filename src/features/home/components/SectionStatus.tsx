interface SectionStatusProps {
  loading: boolean;
  error: string | null;
  label: string;
}

export default function SectionStatus({
  loading,
  error,
  label,
}: SectionStatusProps) {
  if (loading) {
    return (
      <p
        role="status"
        className="border border-dashed border-neon-cyan/40 bg-neon-cyan/5 px-4 py-8 text-center font-mono uppercase tracking-[0.15em] text-neon-cyan"
      >
        Conectando {label}…
      </p>
    );
  }
  if (error) {
    return (
      <p
        role="alert"
        className="border border-dashed border-neon-pink/60 bg-neon-pink/5 px-4 py-8 text-center text-neon-pink"
      >
        Falló la conexión ({label}): {error}
      </p>
    );
  }
  return null;
}
