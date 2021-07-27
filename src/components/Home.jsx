import React, { useContext } from 'react';
import Table from './Table';
import InputFilter from './InputFilter';
import { Planet } from '../context/Planet';

export default function Home() {
  const { data } = useContext(Planet);

  if (data) {
    return (
      <div>
        <InputFilter />
        <Table />
      </div>
    );
  }
  return (
    <div>
      Carregando...
    </div>
  );
}
