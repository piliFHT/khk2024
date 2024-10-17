import React, { useEffect, useRef, useState } from 'react';
import "../App.css";

const HomeComponent = () => {
    const [geoData, setGeoData] = useState(null); // Stav pro GeoJSON data
    const [filteredData, setFilteredData] = useState([]); // Stav pro filtrovaná data
    const [searchQuery, setSearchQuery] = useState(''); // Stav pro vyhledávací query
    const [dropdownOpen, setDropdownOpen] = useState(false); // Stav pro dropdown otevření/zavření
    const dropdownRef = useRef(null); // Reference pro dropdown div

    useEffect(() => {
        // Fetch GeoJSON data z backendu
        fetch("http://localhost:8000/message") // URL backendu
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setGeoData(data); // Uložení dat do stavu
                setFilteredData(data.features); // Nastavení počátečního zobrazení všech dat
            })
            .catch((error) => {
                console.error("Error fetching the GeoJSON:", error);
            });
    }, []);

    useEffect(() => {
        // Funkce pro skrytí dropdownu při kliknutí mimo
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        // Přidání posluchače události
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function, která se zavolá při unmountování komponenty
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Funkce pro filtrování dat na základě vyhledávání
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (geoData) {
            const filtered = geoData.features.filter(feature =>
                feature.properties.nazev.toLowerCase().includes(query)
            );
            setFilteredData(filtered);
        }
    };

    // Funkce pro výběr položky z dropdownu
    const handleOptionClick = (nazev) => {
        console.log('Selected option:', nazev);
        setSearchQuery(nazev);
        setDropdownOpen(false); // Zavřeme dropdown po výběru
    };

    return (
        <div className="geo-container">
            <h2>GeoJSON Data:</h2>
            <div className="dropdown" ref={dropdownRef}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Vyhledat..."
                    className="dropdown-btn"
                    onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle otevření dropdownu
                />
                {dropdownOpen && (
                    <div className="dropdown-content">
                        {filteredData.length > 0 ? (
                            filteredData.map((feature, index) => (
                                <a
                                    href="#"
                                    key={index}
                                    onClick={() => handleOptionClick(feature.properties.nazev)}
                                >
                                    {feature.properties.nazev}
                                </a>
                            ))
                        ) : (
                            <p>No results found</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeComponent;
