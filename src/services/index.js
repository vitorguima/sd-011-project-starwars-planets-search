const fetchPlanets = async () => {
  try {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export default fetchPlanets;
