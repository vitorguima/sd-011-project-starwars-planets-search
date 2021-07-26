import React from 'react';
import PlanetFilters from '../components/PlanetFilters';
import Table from '../components/Table';

export default function Home() {
  return (
    <div>
      <PlanetFilters />
      <Table />
    </div>
  );
}
