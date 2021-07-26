import { useContext, useEffect } from 'react';
import { Planet } from '../context/Planet';

function useFetch() {
  const { setData, fetchData } = useContext(Planet);

  useEffect(() => {
    const getData = async () => {
      const dataReceived = await fetchData();
      setData(dataReceived);
    };
    getData();
  }, []);
}

export default useFetch;
