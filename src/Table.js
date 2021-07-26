import React, { useContext } from 'react';
import PlanetsContext from './PlanetsContext';

export default function Table() {
  const { data } = useContext(PlanetsContext);

  const renderTableRows = () => data.map((item) => (
    <tr key={ item.name }>
      <td>{item.name}</td>
      <td>{item.rotation_period}</td>
      <td>{item.orbital_period}</td>
      <td>{item.diameter}</td>
      <td>{item.climate}</td>
      <td>{item.gravity}</td>
      <td>{item.terrain}</td>
      <td>{item.surface_water}</td>
      <td>{item.population}</td>
      <td>{item.films[0]}</td>
      <td>{item.created}</td>
      <td>{item.edited}</td>
      <td>{item.url}</td>
    </tr>
  ));

  if (!data.length) {
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
