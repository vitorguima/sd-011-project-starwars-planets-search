import React, { useEffect, useContext } from 'react';
import starwarsPlanetsContext from '../context/starwarsPlanetsContext';

function Data() {
  const { setData } = useContext(starwarsPlanetsContext);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((data) => data.json());

      setData(results);
    };

    getPlanets();
  });

  return (<span>Starwars Planets Search</span>);
}

export default Data;
