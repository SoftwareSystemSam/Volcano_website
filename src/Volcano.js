import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVolcanoDetails } from './api';
import MyMapComponent from './components/Map';
import './App.css';
import BarChartComponent from './components/Chart';
import { AuthProvider, useAuth } from './components/AuthContext';

function Volcano() {
  const { id } = useParams();
  const [volcano, setVolcano] = useState(null);
  const { isAuthenticated } = useAuth();

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

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px'
  };

  const topContainerStyle = {
    display: 'flex',
    width: '100%',
    marginBottom: '20px'
  };

  const detailContainerStyle = {
    flex: 1,
    marginRight: '20px'
  };

  const mapContainerStyle = {
    flex: 2
  };

  const chartContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '20px',
    height: '400px',
    maxWidth: '900px',
    margin: 'auto'
  };

  //Bar Chart stuff
  const populationData = {
    labels: ['5km', '10km', '30km', '100km'],
    datasets: [
      {
        label: 'Population density',
        data: [
          volcano.population_5km,
          volcano.population_10km,
          volcano.population_30km,
          volcano.population_100km,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)', 
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: ['rgba(75, 192, 192, 1)', 
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Start displaying data
  return (
    <div style={containerStyle}>
      <div style={topContainerStyle}>
        <div style={detailContainerStyle}>
          <h2>{volcano.name}</h2>
          <div style={detailContainerStyle}>Country: {volcano.country}</div>
          <div style={detailContainerStyle}>Region: {volcano.region}</div>
          <div style={detailContainerStyle}>Subregion: {volcano.subregion}</div>
          <div style={detailContainerStyle}>Last Eruption: {volcano.last_eruption}</div>
          <div style={detailContainerStyle}>Summit: {volcano.summit} m</div>
          <div style={detailContainerStyle}>Elevation: {volcano.elevation} ft</div>
          <div style={detailContainerStyle}>Latitude: {volcano.latitude}</div>
          <div style={detailContainerStyle}>Longitude: {volcano.longitude}</div>
          {volcano.population_5km && <div>Population within 5km: {volcano.population_5km}</div>}
          {volcano.population_10km && <div>Population within 10km: {volcano.population_10km}</div>}
          {volcano.population_30km && <div>Population within 30km: {volcano.population_30km}</div>}
          {volcano.population_100km && <div>Population within 100km: {volcano.population_100km}</div>}
        </div>
        <div style={mapContainerStyle}>
          <MyMapComponent latitude={volcano.latitude} longitude={volcano.longitude} />
        </div>
      </div>
      <div style={chartContainerStyle}>
        {isAuthenticated && (
          <BarChartComponent chartData={populationData} chartOptions={chartOptions} />
        )}
      </div>
    </div>
  );
}

export default Volcano;

