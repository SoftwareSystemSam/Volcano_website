/* Guide on how to install Pigeon Maps -> https://pigeon-maps.js.org/docs/installation */

import React from 'react';
import { Map, Marker } from 'pigeon-maps';


export default function MyMapComponent({ latitude, longitude }) {
  console.log(`Map coordinates: ${latitude}, ${longitude}`);
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  /* The above had to be parsed to float because the data type must have been string prior */
  return (

    <Map center={[lat, lng]} zoom={6} height={300}>
      <Marker width={50} anchor={[lat, lng]} />

    </Map>
  );
}

