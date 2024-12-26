import { type Map } from "ol";

// Core map service - only defining what we're actually extending/adding
export interface IMapService {
  getMap(): Map | null;
  destroy(): void;
}
