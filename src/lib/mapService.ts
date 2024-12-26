import { Map } from "ol";
import { Coordinate } from "ol/coordinate";
import BaseLayer from "ol/layer/Base";
import { MapOptions } from "ol/Map";

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

  destroy() {
    this.map?.setTarget(undefined);
  }
}
