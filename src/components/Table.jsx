import React, { useState, useEffect } from 'react';

export default function Table() {
  const [data, setData] = useState({});

  function fetchData() {
    return fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((res) => res.json())
      .then((obj) => obj)
      .catch((err) => err);
  }

  useEffect(() => {
    const getData = async () => {
      const dataReceived = await fetchData();
      dataReceived.results.forEach((planet) => {
        delete planet.residents;
      });
      setData(dataReceived);
    };
    getData();
  }, []);

  if (Object.keys(data).length > 0) {
    const tableTitles = () => (
      Object.keys(data.results[0]).map((title, index) => (
        <th key={ index }>{ title }</th>
      ))
    );

    const tableContent = () => (
      data.results.map((planet, index) => (
        <tr key={ index }>
          { Object.values(planet).map((item, actualIndex) => (
            <td key={ actualIndex }>{ item }</td>)) }
        </tr>
      ))
    );

    return (
      <table>
        <thead>
          <tr>
            { tableTitles() }
          </tr>
        </thead>
        <tbody>
          { tableContent() }
        </tbody>
      </table>
    );
  }

  return (
    <p>Carregando...</p>
  );
}
