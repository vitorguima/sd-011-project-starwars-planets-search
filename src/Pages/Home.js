import React, { useContext } from 'react';

import MyContext from '../Context/MyContext';
import Table from '../Components/Table';
import FilterByName from '../Components/FilterByName';

function Home() {
  const { loading } = useContext(MyContext);
  if (loading) return <p>Carregando</p>;
  return (
    <div>
      <FilterByName />
      <Table />
    </div>
  );
}

export default Home;
