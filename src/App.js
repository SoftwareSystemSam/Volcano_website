import './App.css';
import SearchBar from './components/SearchBar';
import React, { useState } from 'react';


function App() {

  const [search, setSearch] = useState("Brisbane");
  const [searchError, setSearchError] = useState(''); // New state for search error
  //const { loading, headlines, error } = useWeather(search, setSearchError);


  // const handleSearchSubmit = (newSearch) => {
  //   if (newSearch.trim()) {
  //     setSearch(newSearch);
  //     setSearchError(""); // Clear search error on a new valid submission
  //   } else {
  //     setSearchError("Please enter a valid city name."); // Set error for empty or invalid search
  //   }
  // };
  return (
    <div className="App">
      <h1> Search for Volcanoes!</h1>
     

      <p1>Hello! We will have a website shortly</p1>
    </div>
  );
}

export default App;
