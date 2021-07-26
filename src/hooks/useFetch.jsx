import { useContext, useEffect } from 'react';
import { Planet } from '../context/Planet';

function useFetch() {
  const { setData, data, fetchData } = useContext(Planet);

  const getData = async () => {
    const dataReceived = await fetchData();
    setData(dataReceived.results);
  };

  useEffect(getData, []);
  if (data) {
    const newData = data;
    newData.forEach((planet) => {
      delete planet.residents;
    });
    setData(newData);
  }
}

export default useFetch;
