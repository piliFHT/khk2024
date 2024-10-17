import React, { useEffect, useRef, useState } from 'react';
import 'selectize/dist/css/selectize.default.css'; // Import Selectize CSS
import $ from 'jquery'; // Import jQuery
import 'selectize'; // Import Selectize

const HomeComponent = () => {
    const selectRef = useRef(null); // Create a ref for the select element
    const [geoData, setGeoData] = useState(null); // State to hold GeoJSON data

    useEffect(() => {
        // Fetch GeoJSON data from your backend
        fetch("http://localhost:8000/message") // Assuming your server returns GeoJSON
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
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
        if (geoData) {
            // Initialize Selectize when GeoJSON data is available
            const $select = $(selectRef.current).selectize({
                onChange: (value) => {
                    console.log('Selected value:', value); // You can handle the selection here
                },
            });

            // Populate Selectize with GeoJSON features
            const selectize = $select[0].selectize;

            geoData.features.forEach((feature) => {
                selectize.addOption({
                    value: feature.properties.nazev,
                    text: feature.properties.nazev,
                });
            });

            selectize.refreshOptions(false); // Refresh options to display newly added ones

            // Cleanup the Selectize instance when the component unmounts
            return () => {
                selectize.destroy();
            };
        }
    }, [geoData]); // Run this effect when geoData changes

    return (
        <div>
            <h1>GeoJSON data:</h1>
            {geoData ? (
                <select ref={selectRef} class="select" placeholder="Select an option...">
                    <option class="option" value="">Select an option...</option>
                </select>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default HomeComponent;
