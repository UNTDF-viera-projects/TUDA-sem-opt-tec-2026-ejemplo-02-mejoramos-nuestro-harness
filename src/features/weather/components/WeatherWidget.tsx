import { useEffect, useState } from 'react';
import {
  fetchCurrentWeather,
  formatLocationName,
  getWeatherInfo,
  getUserPosition,
  reverseGeocode,
  type GeoLocation,
  type WeatherCurrent,
} from '../../../api/weather';

interface WeatherState {
  current: WeatherCurrent;
  location: GeoLocation;
}

export default function WeatherWidget() {
  const [state, setState] = useState<WeatherState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const pos = await getUserPosition();
        const { latitude, longitude } = pos.coords;
        const [weather, location] = await Promise.all([
          fetchCurrentWeather(latitude, longitude, controller.signal),
          reverseGeocode(latitude, longitude, controller.signal),
        ]);
        setState({ current: weather.current, location });
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err.message : 'No se pudo obtener el clima',
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <section
        aria-label="Clima"
        className="clip-cyber border border-neon-cyan/45 bg-cyber-card p-5 shadow-[0_0_0_1px_rgba(255,42,109,0.25),0_0_24px_rgba(0,240,255,0.25)]"
      >
        <p
          role="status"
          className="text-center font-mono text-sm uppercase tracking-[0.15em] text-neon-cyan"
        >
          Obteniendo datos del clima…
        </p>
      </section>
    );
  }

  if (error || !state) {
    return null;
  }

  const { current, location } = state;
  const weatherInfo = getWeatherInfo(current.weather_code);
  const feelsLike = Math.round(current.apparent_temperature);
  const temp = Math.round(current.temperature_2m);

  const meta: Array<[string, string]> = [
    ['Sensación', `${feelsLike}°C`],
    ['Humedad', `${current.relative_humidity_2m}%`],
    ['Viento', `${Math.round(current.wind_speed_10m)} km/h`],
    ['UV Index', String(Math.round(current.uv_index))],
  ];

  return (
    <section
      aria-label="Clima actual"
      className="clip-cyber group relative overflow-hidden border border-neon-cyan/45 bg-cyber-card shadow-[0_0_0_1px_rgba(255,42,109,0.25),0_0_24px_rgba(0,240,255,0.25),inset_0_0_32px_rgba(0,240,255,0.08)] transition duration-300 hover:shadow-[0_0_0_1px_rgba(249,240,2,0.6),0_0_34px_rgba(255,42,109,0.45),0_0_60px_rgba(0,240,255,0.3)]"
      data-testid="weather-widget"
    >
      <div
        aria-hidden="true"
        className="bg-scanlines pointer-events-none absolute inset-0 z-10"
      />

      <div className="relative z-20 flex flex-wrap items-center gap-6 p-5 pb-5">
        <div className="flex items-center gap-4">
          <span className="text-5xl" aria-hidden="true">
            {weatherInfo.icon}
          </span>
          <div>
            <p className="font-mono text-xs tracking-[0.22em] text-neon-cyan">
              SYS.WEATHER // C-137
            </p>
            <p className="text-glow-card mt-1 text-4xl font-black uppercase text-white">
              {temp}°C
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-mono text-sm text-neon-yellow">
            {weatherInfo.description}
          </p>
          <p className="font-mono text-xs text-mist">
            {formatLocationName(location)}
          </p>
        </div>

        <dl className="ml-auto grid grid-cols-2 gap-x-6 gap-y-2 border border-dashed border-neon-cyan/40 bg-neon-cyan/5 p-3">
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
    </section>
  );
}
