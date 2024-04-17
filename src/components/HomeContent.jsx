import React from 'react';
import volcanoImage from '../volcano.jpg';

export default function HomeContent() {
  return (
    <div className="Content">
      <div className="HomeContent">
        <h1>Welcome to Volcanoes of the World</h1>
        <div className="image=-container">
          <img src={volcanoImage} alt="Volcano" className="volcano-image" />
        </div>
        <div className="home-content">
          <p>Explore the fascinating world of volcanoes with our interactive platform.
            Discover volcanoes across the globe and dive into detailed information about each majestic natural wonder.
          </p>
          <h2> Features:</h2>
          <li> Browse Volcanoes: View a comprehensive list of volcanoes around the world. Learn about their locations and significant eruptions. </li>
          <li> Detailed Information: Access in-depth details about each volcano, including summit elevation, last eruption, and geographical coordinates.</li>
          <li> Population Density Data: Registered users can unlock additional data, such as the population density within various distances from each volcano.</li>
          <h2> Get Started:</h2>
          <li> View Volcanoes: Start exploring by visiting our Volcano List page.</li>
          <li> Create an Account: To access exclusive data, register for an account and experience the full suite of features our site has to offer.</li>
        </div>
      </div>
    </div>
  );
}
