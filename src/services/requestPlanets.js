const requestPlanets = () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  return (
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => data)
  );
};

export default requestPlanets;
