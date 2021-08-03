import React, { useEffect, useState } from 'react';

// import PlanetsContext from '../context/PlanetsContext';
import fetchPlanets from '../services/api';

export default function Table() {
  const [planets, setPlanets] = useState();
  const header = ['Name', 'Rotation', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'Url'];

  useEffect(() => {
    async function asyncFunc() {
      setPlanets(await fetchPlanets());
    }
    asyncFunc();
  }, []);

  return (
    <table>
      <tr>
        {header.map((h, i) => <th key={ i }>{ h }</th>)}
      </tr>
    </table>
  );
}
