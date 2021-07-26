export default async function fetchApiRequest() {
  const URL = 'https://economia.awesomeapi.com.br/json/all';

  const fetchAPI = await fetch(URL);
  const data = await fetchAPI.json();
  return data;
}
