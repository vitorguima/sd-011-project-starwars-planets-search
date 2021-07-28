const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const getPlanets = () => {
  const i = fetch(URL)
    .then((response) => (response.json()
      .then((e) => (response.ok ? Promise.resolve(e)
        : Promise.reject(e)))));
  return i;
};

export default getPlanets;
