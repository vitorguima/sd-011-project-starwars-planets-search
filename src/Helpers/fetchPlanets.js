export default fetchPlanets = () => {
  fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json())
    .then((planets) => {
      setData(planets.results);
    });
};
