import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Filters from './Filters';
import TableContent from './TableContent';
import TableHeader from './TableHeader';

function Table() {
  const {
    loadingStatus,
  } = useContext(PlanetsContext);

  useEffect(() => {}, []);
  if (loadingStatus) return <div>Loading...</div>;
  return (
    <>
      <TableHeader />
      <Filters />
      <TableContent />
    </>
  );
}

export default Table;
