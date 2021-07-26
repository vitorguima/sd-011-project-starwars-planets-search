import { useState, useEffect } from 'react';
import RemoveResidentsKey from '../Helpers/RemoveResidentsKey';

const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

function useFetch() {
  const [data, setData] = useState(null);
  const [APIerror, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const planets = await response.json();
        setData(RemoveResidentsKey(planets.results));
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return [data, APIerror];
}

export default useFetch;
