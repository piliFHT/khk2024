import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([51.505, -0.09], 13);

    // Set up the OSM layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default MapComponent;
