const starApi = () => fetch('https://swapi-trybe.herokuapp.com/api/planets/')
  .then((response) => response.json())
  .then(({ results }) => results)
  .catch((err) => console.error(err));

export default starApi;
