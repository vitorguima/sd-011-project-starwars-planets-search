import { useState, useEffect } from 'react';

const GetApiData = () => {
  const [data, setData] = useState([]);
  const [gotInfo, setGotInfo] = useState(false);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((planetsInfo) => planetsInfo.json());
      results.map((e) => delete e.residents);
      setData(results);
      setGotInfo(true);
    };
    getPlanets();
  }, []);

  return [data, gotInfo];
};

export default GetApiData;
