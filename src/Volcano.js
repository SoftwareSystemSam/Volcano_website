import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVolcanoDetails } from './api';

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

  return (
    <div>
      <h2>{volcano.name}</h2>
      <ul>
      <div className="volcano-detail">Country: {volcano.country}</div>
      <div className="volcano-detail">Region: {volcano.region}</div>
      <div className="volcano-detail">Subregion: {volcano.subregion}</div>
      <div className="volcano-detail">Last Eruption: {volcano.last_eruption}</div>
      <div className="volcano-detail">Summit: {volcano.summit} m</div>
      <div className="volcano-detail">Elevation: {volcano.elevation} ft</div>
        {/* If you have latitude and longitude, you can also display them here */}
      </ul>
      {/* Here you would also include the map component */}
    </div>
  );
}

export default Volcano;