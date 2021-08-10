import { useState, useEffect } from 'react';

function PlanetsAPI() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setPlanets(results);
    };
    getPlanets();
  }, []);

  return ({
    planets,
  });
}

export default PlanetsAPI;
