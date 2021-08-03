import React, { useEffect, useState } from 'react';

function Table() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const resultsComplet = await fetch(endpoint).then((data) => data.json());
      setList(resultsComplet.results);
    };
    getData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {list.map((planet) => <th key={ planet.name }>{planet.name}</th>)}
        </tr>
      </thead>
    </table>
  );
}

export default Table;
