import React, { FC, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Salon } from "../data/models/Models";
L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";
interface MapProps {
  salon: Salon;
}

const MapComponent: FC<MapProps> = ({ salon }) => {
  const mapRef = useRef(document.createElement("div"));

  useEffect(() => {
    // Initialize Leaflet map
    const map = L.map(mapRef.current).setView([0, 0], 13); // Default to center of the world

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 13); // Set map view to user's current location

        // Add marker at user's current location
        L.marker([latitude, longitude]).addTo(map).bindPopup("You are here").openPopup();

        // Add circle around user's current location
        L.circle([latitude, longitude], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 500, // Radius in meters
        }).addTo(map);

        L.marker([Number(salon.latitude), Number(salon.longitude)])
          .bindPopup(`${salon.name} is here!`)
          .addTo(map);
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  }, []);

  return <div style={{ width: "100%", height: "400px" }} ref={mapRef} />;
};

export default MapComponent;
