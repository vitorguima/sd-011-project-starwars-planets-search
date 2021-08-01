import React, { useContext, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';

export default function Table() {
  const { filteredData, fetchData, data,
    setFilteredData, applyFilters } = useContext(PlanetsContext);

  useEffect(() => {
    const getData = async () => {
      await fetchData();
    };
    getData();
  }, []);

  useEffect(() => {
    setFilteredData(data);
    applyFilters();
  }, [data]);

  const renderTableRows = () => filteredData.map((item) => (
    <tr key={ item.name }>
      <td data-testid="planet-name">{item.name}</td>
      <td>{item.rotation_period}</td>
      <td>{item.orbital_period}</td>
      <td>{item.diameter}</td>
      <td>{item.climate}</td>
      <td>{item.gravity}</td>
      <td>{item.terrain}</td>
      <td>{item.surface_water}</td>
      <td>{item.population}</td>
      <td>{item.films}</td>
      <td>{item.created}</td>
      <td>{item.edited}</td>
      <td>{item.url}</td>
    </tr>
  ));

  if (!filteredData.length) {
    return <h1>Loading</h1>;
  } return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((item) => <th key={ item }>{ item }</th>)}
        </tr>
      </thead>
      <tbody>
        {renderTableRows()}
      </tbody>
    </table>
  );
}
