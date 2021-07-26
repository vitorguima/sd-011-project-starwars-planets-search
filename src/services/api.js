import React from 'react';

const FetchPlanets = () => {
  const [planets, setPlanets] = React.useState([]);
  function fetchApiStarWars() {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then(({ results }) => setPlanets(results));
  }
  React.useEffect(fetchApiStarWars, []);
  return planets;
};

export default FetchPlanets;
