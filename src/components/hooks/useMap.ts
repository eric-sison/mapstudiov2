"use client";

import { RefObject, useEffect, useState } from "react";
import { MapService } from "@mapstudio/lib/mapService";
import { defaults as defaultInteractions } from "ol/interaction";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";

export const useMap = (ref: RefObject<HTMLDivElement>) => {
  const [mapService, setMapService] = useState<MapService>();

  useEffect(() => {
    if (!ref?.current) return;

    const mapService = new MapService({
      target: ref.current,

      // TODO: add custom controls
      controls: [],

      // set the default layer to OSM
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],

      // set the default view
      view: new View({
        center: [7.85, 47.983333],
        zoom: 2,
      }),

      // set the default interactions
      interactions: defaultInteractions({
        doubleClickZoom: true,
        dragPan: true,
        mouseWheelZoom: true,
      }),
    });

    setMapService(mapService);

    // cleanup
    return () => {
      mapService.destroy();
      setMapService(undefined);
    };
  }, [ref]);

  return { mapService };
};
