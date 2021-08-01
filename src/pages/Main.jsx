import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

export default function Main() {
  const {
    data,
    setData,
  } = useContext(PlanetsContext);

  useEffect(() => {
    const setResultsAsData = async () => {
      await fetchPlanets().then(
        ((results) => (setData(results))),
        (() => null),
      );
    };
    setResultsAsData();
  }, [setData]);

  console.log(data);

  return (
    <div>
      hi there
    </div>
  );
}
