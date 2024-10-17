const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Function to read a GeoJSON file
const readGeoJSONFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

// Endpoint to get combined GeoJSON data
app.get("/kultura", async (req, res) => {
  const filePaths = [
    path.join(__dirname, "zamky.geojson")
  ];

  try {
    // Read all GeoJSON files and combine them into a single object
    const geoJSONDataArray = await Promise.all(
      filePaths.map(filePath => readGeoJSONFile(filePath))
    );

    // Combine the GeoJSON data (assuming they are FeatureCollections)
    const combinedGeoJSON = {
      type: "FeatureCollection",
      features: geoJSONDataArray.flatMap(data => data.features),
    };

    res.json(combinedGeoJSON);
  } catch (error) {
    console.error("Error reading GeoJSON files:", error);
    res.status(500).json({ error: "Failed to read GeoJSON files." });
  }
});

app.get("/autobusy", async (req, res) => {
  const filePath = path.join(__dirname, "autobusy.geojson");

  try {
    const data = await readGeoJSONFile(filePath);
    res.json(data);
  } catch (error) {
    console.error("Error reading hrady.geojson:", error);
    res.status(500).json({ error: "Failed to read hrady.geojson." });
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
