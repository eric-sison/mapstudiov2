"use client";

import { RefObject, useRef, type FunctionComponent } from "react";
import { useMap } from "@mapstudio/components/hooks/useMap";

export const Map: FunctionComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

  const { mapService } = useMap(mapRef);

  mapService?.setCenter([7.85, 47.983333]);
  mapService?.setZoom(4);

  return <div ref={mapRef} id="map" />;
};
