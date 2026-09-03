interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
  label,
}: SearchBarProps) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan">
        {label}
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-neon-cyan/45 bg-void/80 px-4 py-3 text-ice placeholder:text-mist/60 focus:border-neon-yellow focus:outline-none"
      />
    </label>
  );
}
