"use client";

import { useCallback } from "react";
import { Map, View } from "ol";
import { equivalent, fromLonLat, get as getProjection, ProjectionLike, toLonLat } from "ol/proj";

export const useProjection = () => {
  const changeProjection = useCallback((map: Map, newProjectionLike: ProjectionLike) => {
    if (!map) return;

    const oldView = map.getView();
    const oldProjection = oldView.getProjection();
    const newProjection = getProjection(newProjectionLike);

    if (!newProjection) {
      console.error("Invalid projection:", newProjectionLike);
      return;
    }

    // Skip if projections are equivalent
    if (equivalent(oldProjection, newProjection)) return;

    // Get current view state
    const oldCenter = oldView.getCenter();
    const oldZoom = oldView.getZoom();

    if (!oldCenter) return;

    // Convert center to lat/lon (EPSG:4326) as an intermediate step
    const latLonCenter = toLonLat(oldCenter, oldProjection);

    // Convert from lat/lon to new projection
    const newCenter = fromLonLat(latLonCenter, newProjection);

    // Create new view with the new projection
    const newView = new View({
      projection: newProjection,
      center: newCenter,
      zoom: oldZoom,
      constrainResolution: true,
    });

    map.setView(newView);

    // Force immediate rendering
    map.renderSync();
  }, []);

  return {
    changeProjection,
  };
};
