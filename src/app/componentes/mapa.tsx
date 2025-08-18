"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    mapsScriptLoaded?: boolean;
  }
}

interface MapaProps {
  origem: string;
  destino: string;
}

export default function Mapa({ origem, destino }: MapaProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google?.maps && !window.mapsScriptLoaded) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDlKlTRhCG9upjTxEYzWX-giyiV_FIMMaQ&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          window.mapsScriptLoaded = true;
          initializeMap();
        };
        document.head.appendChild(script);
      } else if (window.google?.maps) {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current && !map) {
        const googleMap = new google.maps.Map(mapRef.current, {
          center: { lat: -23.5505, lng: -46.6333 },
          zoom: 12,
        });

        const transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(googleMap);

        setMap(googleMap);
        setDirectionsService(new google.maps.DirectionsService());
        setDirectionsRenderer(new google.maps.DirectionsRenderer({ map: googleMap }));
      }
    };

    loadGoogleMaps();
  }, [map]);

  useEffect(() => {
    if (directionsService && directionsRenderer && origem && destino) {
      const request: google.maps.DirectionsRequest = {
        origin: origem,
        destination: destino,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true,
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK" && result && result.routes) {
          const rotasMetro = result.routes.filter(route =>
            route.legs && route.legs.some(leg =>
              leg.steps && leg.steps.some(step => {
                const vehicleType = step.transit && step.transit.line && step.transit.line.vehicle && step.transit.line.vehicle.type;
                return (
                  vehicleType === google.maps.VehicleType.SUBWAY ||
                  vehicleType === google.maps.VehicleType.HEAVY_RAIL
                );
              })
            )
          );

          if (rotasMetro.length > 0) {
            directionsRenderer.setDirections({ ...result, routes: rotasMetro });
          } else {
            alert("Nenhuma rota de metrô encontrada. Mostrando outras opções.");
            directionsRenderer.setDirections(result);
          }
        } else {
          alert("Não foi possível encontrar uma rota.");
        }
      });
    }
  }, [origem, destino, directionsService, directionsRenderer]);

  return (
    <div className="my-5 mx-auto w-[80%] max-w-[1500px] flex justify-center items-center">
      <div ref={mapRef} className="w-[80%] h-[500px] rounded-lg border"></div>
    </div>
  );
}
