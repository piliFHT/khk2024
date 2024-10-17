import React, { useEffect, useState } from "react";
import L, { Draggable, setOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import blicon from "../assets/blackPoint.svg";
import reicon from "../assets/redPoint.svg";

const MapComponent = () => {
  const [geoData, setGeoData] = useState(null); // State to hold GeoJSON data for cultural points
  const [autoData, setAutoData] = useState(null); // State to hold GeoJSON data for bus stops
  const [selectedPoints, setSelectedPoints] = useState([]); // Store clicked points
  const [map, setMap] = useState(null); // Store Leaflet map instance

  useEffect(() => {
    // Fetch GeoJSON data for cultural points
    fetch("http://localhost:8000/kultura") // Your API endpoint for cultural points
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

    // Fetch GeoJSON data for bus stops
    fetch("http://localhost:8000/autobusy") // Your API endpoint for bus stops
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAutoData(data); // Set the fetched GeoJSON data to state
      })
      .catch((error) => {
        console.error("Error fetching the bus stops GeoJSON data:", error);
      });
  }, []);

  useEffect(() => {
    if (geoData && autoData) {
      // Initialize the map when geoData and autoData are available
      const newMap = L.map("map").setView(
        [
          geoData.features[0].geometry.coordinates[1], // Latitude
          geoData.features[0].geometry.coordinates[0], // Longitude
        ],
        13
      );

      let customIcon = {
        iconUrl:blicon,
        iconSize:[40,40]
      };    
      let myIcon = L.icon(customIcon);
      let iconOptions = {
        title:"{autoData.feature.properties.nazev}",
        Draggable:false,
        icon:myIcon
      };

      // Set up the OSM tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(newMap);

      // Store the map instance
      setMap(newMap);

      // Add a marker for each feature in geoData
      geoData.features.forEach((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;
        // Add marker with click event
        const marker = L.marker([latitude, longitude], iconOptions)
          .addTo(newMap)
          .bindPopup(`<b>${feature.properties.nazev}</b>`); // Display the name in a popup
        // On marker click, handle selection
        marker.on("click", () => {
          if (selectedPoints.length < 2) {
            setSelectedPoints((prev) => [...prev, { latitude, longitude }]);
          }
        });
      });

      // Add a marker for each feature in autoData
      autoData.features.forEach((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;
        // Add marker with click event
        const marker = L.marker([latitude, longitude])
          .addTo(newMap)
          .bindPopup(`<b>${feature.properties.nazev}</b>`); // Display the name in a popup
        // On marker click, handle selection
        marker.on("click", () => {
          if (selectedPoints.length < 2) {
            setSelectedPoints((prev) => [...prev, { latitude, longitude }]);
          }
        });
      });
    }
  }, [geoData, autoData]);

  // Calculate walking route when two points are selected
  useEffect(() => {
    if (selectedPoints.length === 2 && map) {
      const [point1, point2] = selectedPoints;
      // Fetch the route from ORS API for walking
      const apiKey = "5b3ce3597851110001cf6248c7f3ebda7a7c4bf6bfd4ec13a4df091e"; // Replace with your ORS API key
      const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${apiKey}&start=${point1.longitude},${point1.latitude}&end=${point2.longitude},${point2.latitude}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Draw the route on the map
          const route = data.features[0].geometry.coordinates;
          const latlngs = route.map((coord) => [coord[1], coord[0]]);
          L.polyline(latlngs, { color: "blue" }).addTo(map); // Add route as a polyline to the map
          map.fitBounds(latlngs); // Adjust the map view to fit the route
        })
        .catch((error) => {
          console.error("Error fetching route:", error);
        });
      // Clear selected points after fetching the route
      setSelectedPoints([]);
    }
  }, [selectedPoints, map]); // Run this effect when selectedPoints or map changes

  return (
    <>
      <div
        id="map"
        style={{ height: "500px", width: "100%", padding: "5rem" }}
      ></div>
    </>
  );
};

export default MapComponent;
