import React from 'react';
import { useNavigate } from 'react-router-dom';
import VolcanoGrid from '../components/VolcanoGrid';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css";
import { getCountriesWithVolcanoes } from '../api';
import { useState, useEffect } from "react";

const Volcano_List = () => {
    //Volcano Grid stuff
    const [countries, setCountries] = useState([]);
    const [error] = useState(null);
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
            <h1>Volcano Catalogue</h1>
            <p>To explore the volcanoes:</p>
            <ul>
                <li>
                    <strong>Select a country</strong> from the dropdown list.
                </li>
                <li>
                    Choose a <strong>distance</strong> to find volcanoes within that range. The list will update accordingly.
                </li>
                <li>
                    <strong>Learn more</strong> about a specific volcano by clicking on its name in the table.
                </li>
                <li>
                    To sort data, click on the <strong>up/down arrows</strong> or the <strong>menu icon (☰)</strong> beside each column name for more options.
                </li>
            </ul>
            <VolcanoGrid countries={countries}
                onVolcanoClick={handleVolcanoClick} />
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Volcano_List;