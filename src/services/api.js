const URL_BASE = 'https://swapi-trybe.herokuapp.com/api/';

export default async () => {
  const response = await fetch(`${URL_BASE}planets/`, {
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  return data;
};
