import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const request = React.useCallback(async () => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      const filteredResults = json.results.map((item) => {
        delete item.residents;
        return item;
      });
      setData(filteredResults);
      setLoading(false);
    }
  }, []);
  return { data, loading, error, request };
};
export default useFetch;
