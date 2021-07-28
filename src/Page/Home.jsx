import React from 'react';
import Table from '../components/Table';
import Provider from '../context/Provider';
import Form from '../components/Form';

function Home() {
  return (
    <Provider>
      <h1 className="title">Star Wars Search</h1>
      <Form />
      <Table />
    </Provider>
  );
}

export default Home;
