import { useState, useEffect } from 'react';

function getCountriesWithVolcanoes() {
    const url = `http://4.237.58.241:3000/countries`
    return fetch(url)
      .then((res) => res.json())
      .then((data) =>
        data.map((country) => ({
          name: country.name
        }))
      );
  }

  function getVolcanoWithCountries(country,distance) {
    const url = `http://4.237.58.241:3000/volcanoes?country=${country}&populatedWithin=${distance}km`
    return fetch(url)
      .then((res) => res.json())
      .then((data) =>
        data.map((volcano) => ({
          
            id: volcano.id,
            name: volcano.name,
            country:  volcano.country,
            region: volcano.region,
            subregion: volcano.subregion

        }))
      );
  }

  function getVolcanoById(id) {
    const url = `http://4.237.58.241:3000/volcano/${id}`
    return fetch(url)
      .then((res) => res.json())
      .then((volcano) => ({
          
            name: volcano.name,
            country:  volcano.country,
            region: volcano.region,
            subregion: volcano.subregion,
            last_eruption: volcano.last_eruption,
            summit: volcano.summit,
            elevation: volcano.elevation,
            latitude: volcano.latitude,
            longitude: volcano.longitude

        }));
  }