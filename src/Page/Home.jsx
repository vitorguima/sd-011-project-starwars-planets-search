import React from 'react';
import Table from '../components/Table';
import Provider from '../context/Provider';

function Home() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default Home;
