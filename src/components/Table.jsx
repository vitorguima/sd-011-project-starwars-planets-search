import React, { useContext } from 'react';
import TableHeader from './TableHeader';
import PlanetsContext from '../context/PlanetsContext';
import TableRow from './TableRow';

export default function Table() {
  const {
    planets,
  } = useContext(PlanetsContext);

  return (
    <table>
      <TableHeader />
      <tbody>
        {
          planets.length > 0 && planets.map((planet) => (
            <TableRow planet={ planet } key={ planet.name } />
          ))
        }
      </tbody>
    </table>
  );
}
