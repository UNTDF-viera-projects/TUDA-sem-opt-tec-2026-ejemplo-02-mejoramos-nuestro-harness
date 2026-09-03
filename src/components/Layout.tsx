import { NavLink, Outlet } from 'react-router';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/characters', label: 'Personajes', end: false },
  { to: '/episodes', label: 'Episodios', end: false },
  { to: '/locations', label: 'Ubicaciones', end: false },
];

export default function Layout() {
  return (
    <div className="bg-cyber-page flex min-h-svh flex-col bg-void text-ice">
      <header className="relative overflow-hidden border-b border-neon-cyan/30 px-6 pb-8 pt-14 text-center">
        <p className="mb-3 font-mono text-xs tracking-[0.35em] text-neon-yellow">
          NIGHT CITY // C-137 ARCHIVE
        </p>
        <h1 className="text-glow-hero text-[clamp(2.4rem,7vw,4.5rem)] font-black uppercase leading-none tracking-wide text-white">
          Rick
          <span className="text-glow-cyan text-neon-cyan">_and_</span>
          Morty
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-mist">
          Archivo del multiverso — directo desde{' '}
          <a
            href="https://rickandmortyapi.com/documentation"
            target="_blank"
            rel="noreferrer"
            className="text-neon-cyan underline underline-offset-[3px]"
          >
            rickandmortyapi.com
          </a>
        </p>
        <nav
          aria-label="Principal"
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `border px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition ${
                  isActive
                    ? 'border-neon-yellow bg-neon-yellow text-void shadow-[3px_3px_0_#ff2a6d]'
                    : 'border-neon-cyan/45 text-neon-cyan hover:bg-neon-cyan/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-cyan shadow-[0_0_20px_rgba(0,240,255,0.8)]"
        />
      </header>

      <main className="mx-auto box-border w-full max-w-6xl flex-1 px-6 py-10 pb-14">
        <Outlet />
      </main>

      <footer className="flex flex-wrap justify-between gap-3 border-t border-neon-yellow/35 bg-void/90 px-6 py-4 font-mono text-xs tracking-[0.2em] text-neon-yellow">
        <span>SYS.ONLINE</span>
        <span>C-137 ARCHIVE</span>
        <span>CYB3RPUNK v1.0</span>
      </footer>
    </div>
  );
}
