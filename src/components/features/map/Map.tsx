"use client";

import { RefObject, useRef, type FunctionComponent } from "react";
import { useMap } from "@mapstudio/components/hooks/useMap";
import { useProjection } from "@mapstudio/components/hooks/useProjection";
import { Button } from "@mapstudio/components/ui/Button";

export const Map: FunctionComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

  const { mapService } = useMap(mapRef);

  const map = mapService?.getMap();

  const { changeProjection } = useProjection();

  const switchToWGS84 = () => {
    if (!map) return;
    changeProjection(map, "EPSG:4326");
  };

  const switchToWebMercator = () => {
    if (!map) return;
    changeProjection(map, "EPSG:3857");
  };

  return (
    <>
      <div className="z-50 absolute flex items-center gap-2">
        <Button
          onClick={() => {
            console.log(mapService?.getMap()?.getView().getProjection());
          }}
        >
          Get Projection
        </Button>

        <Button onClick={switchToWGS84}>Switch to WGS84</Button>

        <Button onClick={switchToWebMercator}>Switch to Mercator</Button>
      </div>

      <div ref={mapRef} id="map" />
    </>
  );
};
