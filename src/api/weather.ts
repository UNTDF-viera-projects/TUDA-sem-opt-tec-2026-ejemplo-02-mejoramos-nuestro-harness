const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1';
const GEOCODING_BASE = 'https://geocoding-api.open-meteo.com/v1';

export interface WeatherCurrent {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  uv_index: number;
  is_day: number;
}

export interface WeatherDaily {
  sunrise: string[];
  sunset: string[];
}

export interface WeatherResponse {
  current: WeatherCurrent;
  daily: WeatherDaily;
  timezone: string;
}

export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

const WMO_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Cielo despejado', icon: '☀️' },
  1: { description: 'Principalmente despejado', icon: '🌤️' },
  2: { description: 'Parcialmente nublado', icon: '⛅' },
  3: { description: 'Nublado', icon: '☁️' },
  45: { description: 'Niebla', icon: '🌫️' },
  48: { description: 'Niebla con escarcha', icon: '🌫️' },
  51: { description: 'Llovizna ligera', icon: '🌦️' },
  53: { description: 'Llovizna moderada', icon: '🌦️' },
  55: { description: 'Llovizna densa', icon: '🌧️' },
  61: { description: 'Lluvia ligera', icon: '🌧️' },
  63: { description: 'Lluvia moderada', icon: '🌧️' },
  65: { description: 'Lluvia fuerte', icon: '🌧️' },
  71: { description: 'Nevada ligera', icon: '🌨️' },
  73: { description: 'Nevada moderada', icon: '🌨️' },
  75: { description: 'Nevada fuerte', icon: '❄️' },
  80: { description: 'Chubascos ligeros', icon: '🌦️' },
  81: { description: 'Chubascos moderados', icon: '🌧️' },
  82: { description: 'Chubascos violentos', icon: '⛈️' },
  95: { description: 'Tormenta', icon: '⛈️' },
  96: { description: 'Tormenta con granizo', icon: '⛈️' },
  99: { description: 'Tormenta con granizo fuerte', icon: '⛈️' },
};

export function getWeatherInfo(code: number): {
  description: string;
  icon: string;
} {
  return WMO_CODES[code] ?? { description: 'Desconocido', icon: '❓' };
}

export function formatLocationName(geo: GeoLocation): string {
  const parts = [geo.name];
  if (geo.admin1) parts.push(geo.admin1);
  if (geo.country) parts.push(geo.country);
  return parts.join(', ');
}

export async function reverseGeocode(
  lat: number,
  lon: number,
  signal?: AbortSignal,
): Promise<GeoLocation> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    count: '1',
    language: 'es',
    format: 'json',
  });
  const response = await fetch(`${GEOCODING_BASE}/search?${params}`, {
    signal,
  });
  if (!response.ok) throw new Error(`Geocoding error: ${response.status}`);
  const data = await response.json();
  if (!data.results?.length) {
    return {
      name: 'Ubicación desconocida',
      latitude: lat,
      longitude: lon,
      country: '',
    };
  }
  const result = data.results[0];
  return {
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country ?? '',
    admin1: result.admin1,
  };
}

export async function fetchCurrentWeather(
  lat: number,
  lon: number,
  signal?: AbortSignal,
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'uv_index',
      'is_day',
    ].join(','),
    daily: ['sunrise', 'sunset'].join(','),
    timezone: 'auto',
    forecast_days: '1',
  });
  const response = await fetch(`${OPEN_METEO_BASE}/forecast?${params}`, {
    signal,
  });
  if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
  return response.json();
}

export function getUserPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000,
    });
  });
}
