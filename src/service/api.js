export default function fetchApi() {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  return fetch(URL)
    .then((response) => response.json())
    .then(({ results }) => results)
    .catch((err) => console.error(err));
}
// definição de responsabilidade, logo crio apenas essa função aqui e a chamo no provider
