import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVolcanoDetails } from './api';
import MyMapComponent from './components/Map';
import './App.css';
function Volcano() {
  const { id } = useParams();
  const [volcano, setVolcano] = useState(null);

  useEffect(() => {
    getVolcanoDetails(id)
      .then(data => setVolcano(data))
      .catch(error => {
        console.error('Error fetching volcano details:', error);
      });
  }, [id]);

  if (!volcano) {
    return <div>Loading...</div>;
  }

   // Adjust styles here
   const detailStyle = {
    marginBottom: '20px' // Adjust for spacing
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'flex-start', // Adjust the alignment as needed
    justifyContent: 'center',
    padding: '20px'
  };

  const detailContainerStyle = {
    flex: 1
  };

  const mapContainerStyle = {
    flex: 5,
    maxWidth: '60%',
    marginLeft: '20px',
    alignSelf: 'flex-end' // Aligns the map
  };

  return (
    <div style={containerStyle}>
      <div style={detailContainerStyle}>
        <h2>{volcano.name}</h2>
        <div style={detailStyle}>Country: {volcano.country}</div>
        <div style={detailStyle}>Region: {volcano.region}</div>
        <div style={detailStyle}>Subregion: {volcano.subregion}</div>
        <div style={detailStyle}>Last Eruption: {volcano.last_eruption}</div>
        <div style={detailStyle}>Summit: {volcano.summit} m</div>
        <div style={detailStyle}>Elevation: {volcano.elevation} ft</div>
        <div style={detailStyle}>Latitude: {volcano.latitude}</div>
        <div style={detailStyle}>Longitude: {volcano.longitude}</div>
      </div>

      <div style={mapContainerStyle}>
        <MyMapComponent latitude={volcano.latitude} longitude={volcano.longitude} />
      </div>
    </div>
  );
}

export default Volcano;