import React from 'react';
import Table from '../components/Table';
import InputFilterByName from '../components/InputFilterByName';
import InputFilterByNumber from '../components/InputFIlterByNumber';

function Main() {
  return (
    <main>
      <InputFilterByName />
      <InputFilterByNumber />
      <Table />
    </main>
  );
}

export default Main;
