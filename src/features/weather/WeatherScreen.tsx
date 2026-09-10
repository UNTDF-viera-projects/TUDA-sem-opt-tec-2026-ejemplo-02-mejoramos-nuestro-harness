import WeatherWidget from './components/WeatherWidget';

export default function WeatherScreen() {
  return (
    <div className="grid gap-14">
      <section aria-label="Clima">
        <h2 className="text-glow-card mb-6 text-3xl font-black uppercase tracking-wide text-white">
          Clima
        </h2>
        <WeatherWidget />
      </section>
    </div>
  );
}
