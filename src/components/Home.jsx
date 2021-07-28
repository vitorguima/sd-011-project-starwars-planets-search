import React, { useContext } from 'react';
import Table from './Table';
import InputFilter from './InputFilter';
import { Planet } from '../context/Planet';
import SelectFilter from './SelectFilter';

export default function Home() {
  const { data } = useContext(Planet);

  if (data) {
    return (
      <div>
        <InputFilter />
        <SelectFilter />
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
