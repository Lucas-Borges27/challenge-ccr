"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window { mapsScriptLoaded?: boolean; }
}

interface MapaProps { origem: string; destino: string; }

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
        script.onload = () => { window.mapsScriptLoaded = true; initializeMap(); };
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
          disableDefaultUI: false,
        });

        new google.maps.TransitLayer().setMap(googleMap);
        setMap(googleMap);
        setDirectionsService(new google.maps.DirectionsService());
        setDirectionsRenderer(new google.maps.DirectionsRenderer({ map: googleMap }));
      }
    };

    loadGoogleMaps();
  }, [map]);

  useEffect(() => {
    if (directionsService && directionsRenderer && origem && destino) {
      directionsService.route(
        { origin: origem, destination: destino, travelMode: google.maps.TravelMode.TRANSIT, provideRouteAlternatives: true },
        (result, status) => {
          if (status === "OK" && result) {
            const rotasMetro = result.routes.filter(route =>
              route.legs.some(leg =>
                leg.steps.some(step =>
                  ["SUBWAY", "HEAVY_RAIL"].includes(step.transit?.line?.vehicle?.type ?? "")
                )
              )
            );
            directionsRenderer.setDirections(rotasMetro.length > 0 ? { ...result, routes: rotasMetro } : result);
          }
        }
      );
    }
  }, [origem, destino, directionsService, directionsRenderer]);

  return (
    <div className="my-6 mx-auto w-full max-w-5xl">
      <div ref={mapRef} className="w-full h-[500px] rounded-xl border border-gray-200 shadow-md" />
    </div>
  );
}
