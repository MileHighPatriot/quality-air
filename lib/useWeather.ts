"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export type Weather = { now: number; tonightLow: number; tomorrowHigh: number };
export type WeatherState = { status: "loading" } | { status: "ok"; weather: Weather } | { status: "error" };

const KEY = "qa-weather-v1";
const TTL = 20 * 60 * 1000;

/** Current temp, tonight's low and tomorrow's high in Aurora, from Open-Meteo (free, no key). Cached 20 min. */
export function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    try {
      const cached = JSON.parse(sessionStorage.getItem(KEY) ?? "null");
      if (cached && Date.now() - cached.at < TTL) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from session cache
        setState({ status: "ok", weather: cached.weather });
        return;
      }
    } catch {}

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${site.geo.lat}&longitude=${site.geo.lon}` +
      "&current=temperature_2m&daily=temperature_2m_min,temperature_2m_max" +
      "&temperature_unit=fahrenheit&timezone=America%2FDenver&forecast_days=2";
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        const weather: Weather = {
          now: Math.round(json.current.temperature_2m),
          tonightLow: Math.round(json.daily.temperature_2m_min[0]),
          tomorrowHigh: Math.round(json.daily.temperature_2m_max[1]),
        };
        if (![weather.now, weather.tonightLow, weather.tomorrowHigh].every(Number.isFinite)) throw new Error("bad data");
        try {
          sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), weather }));
        } catch {}
        if (!cancelled) setState({ status: "ok", weather });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      })
      .finally(() => clearTimeout(timer));
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, []);

  return state;
}

export type Mode = "heat" | "cool" | "mild";

/** What the house needs: heat if tonight dips below 50°F, cooling if tomorrow tops 85°F. */
export function modeFor(w: Weather): Mode {
  if (w.tonightLow < 50) return "heat";
  if (w.tomorrowHigh >= 85) return "cool";
  return "mild";
}
