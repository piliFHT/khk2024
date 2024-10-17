import { useState, useEffect } from "react";
//import "./App.css";

function HomeComponent() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data); 
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>
        GeoJSON data:
      </h1>
      {geoData ? (
        <div>
          {geoData.features.map((feature, index) => 
          <div key={index}>
            <h2>{feature.properties.nazev}</h2>
          </div>)}
        </div>

      ) : (
      <p>Loading data..</p>
      )}
      <div></div>
    </div>
  );
}

export default HomeComponent;
