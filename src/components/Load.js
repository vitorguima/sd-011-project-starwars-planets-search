import React, { useContext, useEffect } from 'react';
import DataContext from '../context/DataContext';
import Table from './Table';

const Load = () => {
  const { loading, getPlanets } = useContext(DataContext);
  useEffect(() => {
    getPlanets();
  }, []); // componentDidMount

  return (
    <div>
      { loading ? 'loading' : <Table /> }
    </div>
  );
};

export default Load;
