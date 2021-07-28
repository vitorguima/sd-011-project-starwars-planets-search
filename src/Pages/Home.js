import React, { useContext } from 'react';

import MyContext from '../Context/MyContext';
import Table from '../Components/Table';

function Home() {
  const { loading } = useContext(MyContext);
  if (loading) return <p>Carregando</p>;
  return (
    <div>
      <Table />
    </div>
  );
}

export default Home;
