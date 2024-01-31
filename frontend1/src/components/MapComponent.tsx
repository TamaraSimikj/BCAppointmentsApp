import React, { FC, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Salon } from "../data/models/Models";
L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";

interface MapProps {
  salons: Salon[];
}

const MapComponent: FC<MapProps> = ({ salons }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && salons.length > 0) {
      if (mapInstance.current) {
        // If a map instance already exists, remove it before creating a new one
        mapInstance.current.remove();
      }

      const map = L.map(mapRef.current).setView([0, 0], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 13);

          L.marker([latitude, longitude]).addTo(map).bindPopup("You are here").openPopup();

          L.circle([latitude, longitude], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 500,
          }).addTo(map);

          salons.forEach((salon) => {
            L.marker([Number(salon.latitude), Number(salon.longitude)])
              .addTo(map)
              .bindPopup(`<b>${salon.name}</b><br>${salon.address}<br>`)
              .openPopup();
          });
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );

      mapInstance.current = map;
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [salons]);

  return <div style={{ width: "100%", height: "400px" }} ref={mapRef} />;
};

export default MapComponent;
