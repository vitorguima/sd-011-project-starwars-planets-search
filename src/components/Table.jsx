import React, { useContext } from 'react';
import TableHeader from './TableHeader';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const {
    data,
    setPlanets,
    planets,
  } = useContext(PlanetsContext);

  setPlanets(data.results);

  return (
    <table>
      <TableHeader />
    </table>
  );
}
