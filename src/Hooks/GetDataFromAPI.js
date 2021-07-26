import { useState, useEffect } from 'react';

const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

function useFetch() {
  const [APIdata, setData] = useState(null);
  const [APIerror, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const planets = await response.json();
        setData(planets);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return [APIdata, /* loading, */ APIerror];
}

export default useFetch;
