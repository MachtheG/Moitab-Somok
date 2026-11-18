// Minimal types for the d3-geo calls used by scripts/build-ward-map.ts.
declare module "d3-geo" {
  export type GeoPermissibleObjects = object;
  export interface GeoProjection {
    (point: [number, number]): [number, number] | null;
    fitExtent(extent: [[number, number], [number, number]], object: GeoPermissibleObjects): this;
  }
  export function geoMercator(): GeoProjection;
  export function geoPath(projection?: GeoProjection): (object: GeoPermissibleObjects) => string | null;
  export function geoCentroid(object: GeoPermissibleObjects): [number, number];
}
