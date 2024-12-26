"use client";

import { RefObject, useRef, type FunctionComponent } from "react";
import { useMapService } from "@mapstudio/components/hooks/useMapService";
import { Button } from "@mapstudio/components/ui/Button";

export const Map: FunctionComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

  const mapService = useMapService(mapRef);

  const handleProjectionChange = (projectionCode: string) => {
    mapService?.changeProjection(projectionCode);
    console.log("Current projection:", mapService?.getCurrentProjection());
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

        <Button onClick={() => mapService?.setZoom(8)}>Change Zoom</Button>

        <Button onClick={() => handleProjectionChange("EPSG:4326")}>Switch to WGS84</Button>

        <Button onClick={() => handleProjectionChange("EPSG:3857")}>Switch to Mercator</Button>
      </div>

      <div ref={mapRef} id="map" />
    </>
  );
};
