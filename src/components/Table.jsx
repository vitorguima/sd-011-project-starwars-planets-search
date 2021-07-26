import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import TableRow from './TableRow';

export default function Table() {
  const { planets, loading } = useContext(PlanetsContext);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  // useEffect(() => {
  //   const { filterByName: { name } } = filters;
  //   if (name !== '') {
  //     const planetsList = planets.filter((planet) => planet.name === name);
  //     setPlanets(planetsList);
  //   } else {
  //     setPlanets(planets);
  //   }
  // }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const tableHead = Object.keys(planets[0]).filter((key) => key !== 'residents');
  const { filterByName: { name } } = filters;
  const planetsList = planets.filter((planet) => planet.name.includes(name));

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setFilters({ filterByName: { name: e.target.value } }) }
      />
      <table>
        <thead>
          <tr>
            { tableHead.map((key, index) => <th key={ index }>{key}</th>) }
          </tr>
        </thead>
        <tbody>
          { planetsList.map((planet,
            index) => <TableRow key={ index } planet={ planet } />) }
        </tbody>
      </table>
    </div>
  );
}
