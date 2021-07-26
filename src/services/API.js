const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default async function apiPlanets() {
  try {
    const request = await fetch(API_URL);
    const response = await request.json();
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export const residentFilter = (data) => {
  const dataFilter = data.forEach((item) => delete item.residents);
  return dataFilter;
};
