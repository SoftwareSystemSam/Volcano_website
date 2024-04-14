import React, {useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { useNavigate } from "react-router-dom";
import { getCountriesWithVolcanoes, getVolcanoWithCountries } from './api';


const VolcanoGrid = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDistance, setSelectedDistance] = useState('');
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        getCountriesWithVolcanoes().then(setCountries);
    }, []);

    useEffect(() => {
        if (selectedCountry && selectedDistance) {
            getVolcanoWithCountries(selectedCountry, selectedDistance).then(setRowData);
        }
    }, [selectedCountry, selectedDistance]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setRowData([]);
        setSelectedDistance('');
    }

    const handleDistanceChange = (event) => {
        setSelectedDistance(event.target.value);
    }

    return (

        <div>
            <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                    <option key={index} value={country.name}>{country.name}</option>
                ))}
            </select>

            <select value={selectedDistance} onChange={handleDistanceChange}>
                <option value="">Select a distance</option>
                <option value="5">5km</option>
                <option value="10">10km</option>
                <option value="30">30km</option>
                <option value="100">100km</option>
            </select>

            <div
                className="ag-theme-balham"
                style={{ height: "500px", width: "100%" }}
            >
                <AgGridReact
                    columnDefs={[
                        { headerName: "Name", field: "name" },
                        // ... other column definitions ...
                    ]}
                    rowData={rowData}
                // ... other grid options ...
                />
            </div>
        </div>
    );
};

export default VolcanoGrid;