import React, { createContext } from 'react';
import './App.css';
import Forms from './components/Forms';

const planetListContext = createContext();

const fetchPlanetsAPI = async () => {
  const planetList = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json())
    .then((response) => response.results);
  return planetList;
};

console.log(fetchPlanetsAPI());

function App() {
  return (
    <div>
      <planetListContext.Provider value={ fetchPlanetsAPI }>
        <Forms />
      </planetListContext.Provider>
    </div>
  );
}

export default App;
