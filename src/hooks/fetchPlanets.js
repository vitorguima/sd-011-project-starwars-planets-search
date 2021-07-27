import { useState, useEffect } from 'react';

const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

function useFetchPlanets() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(endpoint);
        const { results } = await response.json();

        setData(results);
      } catch (APIerror) {
        setError(APIerror);
      }
    };

    fetchApi();
  }, []);
  return [data, error];
}

export default useFetchPlanets;
