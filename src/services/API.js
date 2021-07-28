import response from '../testData';

async function getPlanets() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  // const request =
  await fetch(url);
  // const { results } = await request.json();
  // console.log(results);
  const finalResult = response.results.map((item) => {
    delete item.residents;
    return item;
  });
  return finalResult;
}

export default getPlanets;
