import React from 'react';
import FilterInput from '../components/FilterInput';
import FilterValues from '../components/FilterValues';
import Table from '../components/Table';

export default function Home() {
  return (
    <div>
      <br />
      <center><h4>Project Star Wars Planet Search</h4></center>
      <center><p>Search for a planet</p></center>
      <FilterInput />
      <FilterValues />
      <hr />
      <Table />
    </div>
  );
}
