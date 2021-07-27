import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Input from './Input';
import TableContent from './TableContent';
import TableHeader from './TableHeader';

function Table() {
  const {
    loadingStatus,
    getPlanetsData,
  } = useContext(PlanetsContext);

  useEffect(() => {
    getPlanetsData();
  }, []);

  useEffect(() => {}, []);
  if (loadingStatus) return <div>Loading...</div>;
  return (
    <>
      <TableHeader />
      <Input />
      <TableContent />
    </>
  );
}

export default Table;
