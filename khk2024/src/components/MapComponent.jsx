import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css"

const MapComponent = () => {
  const [geoData, setGeoData] = useState(null); // State to hold GeoJSON data

  useEffect(() => {
    // Fetch GeoJSON data
    fetch("http://localhost:8000/kultura") // Your API endpoint
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setGeoData(data); // Set the fetched GeoJSON data to state
      })
      .catch((error) => {
        console.error("Error fetching the GeoJSON data:", error);
      });
  }, []);

  useEffect(() => {
    if (geoData) {
      // Initialize the map when geoData is available
      const map = L.map("map").setView(
        [
          geoData.features[0].geometry.coordinates[1], // Latitude
          geoData.features[0].geometry.coordinates[0], // Longitude
        ],
        13
      );

      // Set up the OSM tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add a marker for each feature in geoData
      geoData.features.forEach((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;

        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(`<b>${feature.properties.nazev}</b>`); // Display the name in a popup
      });
    }
  }, [geoData]); // Run this effect when geoData changes

  return (
    <>
      <div className="cont">
        <div id="informationFrame"></div>
        <div id="map"></div>
      </div>
    </>
  )
};

export default MapComponent;