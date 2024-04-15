import React from 'react';
import { useNavigate } from 'react-router-dom';
import VolcanoGrid from './VolcanoGrid';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css";
import { getCountriesWithVolcanoes } from './api';
import { useState, useEffect } from "react";

const Volcano_List = () => {
    //Volcano Grid stuff
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleVolcanoClick = (volcanoId) => {
        navigate(`/volcano/${volcanoId}`);
      };

    useEffect(() => {
        getCountriesWithVolcanoes()
            .then(countriesData => {
                console.log(countriesData); // Check the fetched data structure
                setCountries(countriesData);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);
    return (
        <div>
            <h1>Search Volcanoes via Country</h1>
            {/* Volano list page content goes here */}
            <h1>Volcano Catalogue</h1>
        <VolcanoGrid countries={countries}
        onVolcanoClick={handleVolcanoClick} />
        {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Volcano_List;