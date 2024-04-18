import React, { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { getCountriesWithVolcanoes, getVolcanoWithCountries } from '../api';



const VolcanoGrid = ({ onVolcanoClick}) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDistance, setSelectedDistance] = useState('');
    const [rowData, setRowData] = useState([]);


    useEffect(() => {
        getCountriesWithVolcanoes()
            .then(countryNames => {
                setCountries(countryNames);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    useEffect(() => {
        getCountriesWithVolcanoes().then(setCountries);
    }, []);

    useEffect(() => {
        if (selectedCountry && selectedDistance) {
            getVolcanoWithCountries(selectedCountry, selectedDistance).then(setRowData);
        }
    }, [selectedCountry, selectedDistance]);

    useEffect(() => {
        if (selectedCountry && selectedDistance) {
            getVolcanoWithCountries(selectedCountry, selectedDistance)
                .then(volcanoes => {
                    setRowData(volcanoes);
                })
                .catch(error => {
                    console.error('Failed to fetch volcanoes:', error);
                    setRowData([]);
                });
        }
    }, [selectedCountry, selectedDistance]);

    const columnDefs = [
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Region", field: "region", sortable: true, filter: true },
        { headerName: "Subregion", field: "subregion", sortable: true, filter: true },

    ];

    return (
        <div>
            <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                ))}
            </select>

            <select onChange={(e) => setSelectedDistance(e.target.value)} value={selectedDistance}>
                <option value="">Select a distance</option>
                <option value="5">5km</option>
                <option value="10">10km</option>
                <option value="30">30km</option>
                <option value="100">100km</option>
            </select>

            <div className="ag-theme-balham" style={{ height: '500px', width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={10}
                    onRowClicked={(event) => onVolcanoClick(event.data.id)}
                />
            </div>

          
        </div>
    );
};

export default VolcanoGrid;