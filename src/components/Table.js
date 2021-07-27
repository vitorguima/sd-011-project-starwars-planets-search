import React, { useContext, useEffect } from 'react';
import planetListContext from '../planetListContext';
import fetchPlanetsAPI from '../API';

function Table() {
  const { data, setData } = useContext(planetListContext);

  const getData = () => {
    const dataReceived = fetchPlanetsAPI(setData);

    return dataReceived;
  };
  useEffect(getData, []);

  const lista = data.map((linha, index) => (
    <tr key={ index }>
      <td>
        {linha.name}
      </td>
      <td>
        {linha.rotation_period}
      </td>
      <td>
        {linha.orbital_period}
      </td>
      <td>
        {linha.diameter}
      </td>
      <td>
        {linha.climate}
      </td>
      <td>
        {linha.gravity}
      </td>
      <td>
        {linha.terrain}
      </td>
      <td>
        {linha.surface_water}
      </td>
      <td>
        {linha.population}
      </td>
      <td>
        {linha.films}
      </td>
      <td>
        {linha.created}
      </td>
      <td>
        {linha.edited}
      </td>
      <td>
        {linha.url}
      </td>
    </tr>
  ));
  return (
    <div>
      <label htmlFor="name-filter">
        Busca por nome
        <input type="text" data-testid="name-filter" id="name-filter" />
      </label>
      <table className="table">
        <thread>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
          <tbody>
            {lista}
          </tbody>
        </thread>
      </table>
    </div>
  );
}
export default Table;
