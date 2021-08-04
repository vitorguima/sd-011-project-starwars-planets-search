import React, { useContext, useEffect, useState } from 'react';
import ContextApp from '../context/ContextApp';

function ShowTable() {
  const { titles, APIResult, dataFiltered, nameFilter } = useContext(ContextApp);
  const [renderUpdate, setRenderUpdate] = useState([]);

  useEffect(() => {
    const filteredData = APIResult.filter(({ name }) => (
      name.toLowerCase().includes(nameFilter))).map((planet) => planet);
    const data = nameFilter
      ? filteredData : APIResult;
    setRenderUpdate(data);
  }, [APIResult, dataFiltered, nameFilter]);

  useEffect(() => {
    setRenderUpdate(dataFiltered);
  }, [dataFiltered]);

  return (
    <table>
      <tr>
        { titles.map((titleColumn, index) => (
          <th key={ index }>{ titleColumn }</th>
        )) }
      </tr>

      { renderUpdate.map((contentColumn, index) => (
        <tr key={ index }>
          <td>{ contentColumn.name }</td>
          <td>{ contentColumn.rotation_period }</td>
          <td>{ contentColumn.orbital_period }</td>
          <td>{ contentColumn.diameter }</td>
          <td>{ contentColumn.climate }</td>
          <td>{ contentColumn.gravity }</td>
          <td>{ contentColumn.terrain }</td>
          <td>{ contentColumn.surface_water }</td>
          <td>{ contentColumn.population }</td>
          <td>{ contentColumn.films }</td>
          <td>{ contentColumn.createt }</td>
          <td>{ contentColumn.edited }</td>
          <td>{ contentColumn.url }</td>
        </tr>
      )) }
    </table>
  );
}

export default ShowTable;
