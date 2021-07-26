import React, { useContext, useEffect } from 'react';
import StarContext from '../context/StarContext';
import fetchPlanets from '../context/StarProvider';

function Table() {
  // const { planets, loading, fetchPlanets } = useContext(StarContext);

  useEffect(() => {
    // fetchPlanets();
  },[])

  return (
    <div>
      <p>planets</p>
    </div>
  );
}

export default Table;
