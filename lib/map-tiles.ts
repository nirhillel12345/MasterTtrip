/**
 * Basemap for the home Leaflet map.
 * - If `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is set, Mapbox light raster tiles are used.
 * - Otherwise CartoDB Positron (light_all) is used — no token required.
 */
export type HomeMapTileConfig = {
  url: string;
  attribution: string;
  subdomains?: string | string[];
};

export function getHomeMapTileConfig(): HomeMapTileConfig {
  const token =
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.trim() : undefined;

  if (token) {
    return {
      url: `https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/256/{z}/{x}/{y}?access_token=${encodeURIComponent(token)}`,
      attribution:
        '© <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noreferrer">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
    };
  }

  return {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> © <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>',
  };
}
