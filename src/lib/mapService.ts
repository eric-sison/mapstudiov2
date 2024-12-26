import { Map, View } from "ol";
import { Coordinate } from "ol/coordinate";
import BaseLayer from "ol/layer/Base";
import { MapOptions } from "ol/Map";
import { fromLonLat, get as getProjection, toLonLat, transform } from "ol/proj";

import { IMapService } from "./interfaces/iMapService";

// Basic map implementation
export class MapService implements IMapService {
  private map: Map | null = null;

  constructor(options: MapOptions) {
    if (this.map) {
      console.warn("Map already initialized");
      return;
    }

    this.map = new Map(options);
  }

  getMap(): Map | null {
    return this.map;
  }

  destroy() {
    this.map?.setTarget(undefined);
  }

  // Utility methods
  setCenter(coords: Coordinate): void {
    this.map?.getView().setCenter(coords);
  }

  setZoom(level: number): void {
    this.map?.getView().setZoom(level);
  }

  addLayer(layer: BaseLayer): void {
    this.map?.addLayer(layer);
  }

  removeLayer(layer: BaseLayer): void {
    this.map?.removeLayer(layer);
  }

  // Get current map state
  getCenter(): Coordinate | undefined {
    return this.map?.getView().getCenter();
  }

  getZoom(): number | undefined {
    return this.map?.getView().getZoom();
  }

  // Projection methods
  changeProjection(newProjectionCode: string): void {
    if (!this.map) return;

    const oldView = this.map.getView();
    const oldProjection = oldView.getProjection();
    const newProjection = getProjection(newProjectionCode);

    if (!newProjection) {
      console.error("Invalid projection:", newProjectionCode);
      return;
    }

    // Get current view state
    const oldCenter = oldView.getCenter();
    if (!oldCenter) return;

    // Convert center to lat/lon (EPSG:4326) as intermediate step
    const latLonCenter = toLonLat(oldCenter, oldProjection);

    // Convert from lat/lon to new projection
    const newCenter = fromLonLat(latLonCenter, newProjection);

    // Create new view with new projection
    const newView = new View({
      projection: newProjection,
      center: newCenter,
      zoom: oldView.getZoom(),
      constrainResolution: true,
    });

    this.map.setView(newView);
    this.map.renderSync();
  }

  getCurrentProjection(): string | undefined {
    return this.map?.getView().getProjection().getCode();
  }

  // Helper method to transform coordinates between projections
  transformCoordinates(coords: Coordinate, source: string, destination: string): Coordinate {
    return transform(coords, source, destination);
  }
}
