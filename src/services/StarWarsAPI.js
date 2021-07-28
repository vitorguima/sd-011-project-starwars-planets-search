const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function getPlanets() {
  try {
    const response = await fetch(END_POINT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default getPlanets;
