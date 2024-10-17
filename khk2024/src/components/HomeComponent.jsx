import React, { useEffect, useRef, useState } from "react";
import "selectize/dist/css/selectize.default.css"; // Import Selectize CSS
import $ from "jquery"; // Import jQuery
import "selectize"; // Import Selectize
import L from "leaflet";
import 'leaflet/dist/leaflet.js';
import MapComponent from "./MapComponent";

const HomeComponent = () => {
  const geoSelectRef = useRef(null); // Create a ref for the geo select element
  const autoSelectRef = useRef(null); // Create a ref for the auto select element
  const [geoData, setGeoData] = useState(null); // State to hold GeoJSON data
  const [autoData, setAutoData] = useState(null); // State to hold Auto data

  useEffect(() => {
    // Fetch GeoJSON data for kultura
    fetch("http://localhost:8000/kultura")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setGeoData(data); // Set the GeoJSON data to state
      })
      .catch((error) => {
        console.error("Error fetching the GeoJSON:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch Auto data
    fetch("http://localhost:8000/autobusy")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((autobus) => {
        setAutoData(autobus); // Set the Auto data to state
      })
      .catch((error) => {
        console.error("Error fetching the Auto data:", error);
      });
  }, []);

  useEffect(() => {
    if (geoData) {
      // Initialize Selectize for GeoJSON data when available
      const $geoSelect = $(geoSelectRef.current).selectize({
        onChange: (value) => {
          console.log("Selected Geo value:", value); // Handle selection for geoData
        },
      });

      // Populate Selectize with GeoJSON features
      const geoSelectize = $geoSelect[0].selectize;

      geoData.features.forEach((feature) => {
        geoSelectize.addOption({
          value: feature.properties.nazev,
          text: feature.properties.nazev,
        });
      });

      geoSelectize.refreshOptions(false); // Refresh options to display newly added ones

      // Cleanup the Selectize instance when the component unmounts
      return () => {
        geoSelectize.destroy();
      };
    }
  }, [geoData]); // Run this effect when geoData changes

  useEffect(() => {
    if (autoData) {
      // Initialize Selectize for Auto data when available
      const $autoSelect = $(autoSelectRef.current).selectize({
        onChange: (value) => {
          console.log("Selected Auto value:", value); // Handle selection for autoData
        },
      });

      // Populate Selectize with Auto data features
      const autoSelectize = $autoSelect[0].selectize;

      autoData.features.forEach((feature) => {
        autoSelectize.addOption({
          value: feature.properties.nazev,
          text: feature.properties.nazev,
        });
      });

      autoSelectize.refreshOptions(false); // Refresh options to display newly added ones

      // Cleanup the Selectize instance when the component unmounts
      return () => {
        autoSelectize.destroy();
      };
    }
  }, [autoData]); // Run this effect when autoData changes

  return (
    <>
      <div>
        <h1>GeoJSON data:</h1>
        {geoData ? (
          <select ref={geoSelectRef} placeholder="Select an option...">
            <option value="">Select an option...</option>
          </select>
        ) : (
          <p>Loading Geo data...</p>
        )}
      </div>
      <div>
        <h1>Auto data:</h1>
        {autoData ? (
          <select ref={autoSelectRef} placeholder="Select an option...">
            <option value="">Select an option...</option>
          </select>
        ) : (
          <p>Loading Auto data...</p>
        )}
      </div>
      <br/>
      <MapComponent/>
    </>
  );
};

export default HomeComponent;
