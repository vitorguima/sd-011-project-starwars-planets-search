import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../GlobalContext';
import Filters from './Filters';

export default function Table() {
  const global = useContext(GlobalContext);
  const { loading, data, setSearchName, search, FilterInputs } = global;
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    if (data) {
      setPlanetList(data.results.filter((value) => value
        .name.includes(search.filters.filterByName.name)));
    }
  }, [data, search]);

  const AttFilter = planetList.filter((value) => {
    switch (FilterInputs.comparison) {
    case 'maior que':
      return value[FilterInputs.column] > Number(FilterInputs.value);
    case 'menor que':
      return value[FilterInputs.column] < Number(FilterInputs.value);
    case 'igual a':
      return value[FilterInputs.column] === FilterInputs.value;
    default:
      return true;
    }
  });

  if (loading) return <div>Carregando...</div>;

  const headerTable = Object.keys(data.results[0])
    .filter((itens) => itens !== 'residents');

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        value={ search.filters.filterByName.name }
        onChange={ ({ target: { value } }) => (
          setSearchName({ filters: { filterByName: { name: value } } })) }
      />
      <Filters />
      <table>
        <thead>
          <tr>
            {headerTable.map((element, index) => (
              <th key={ index }>{ element }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AttFilter.map((itens, index) => (
            <tr key={ index }>
              <td>{itens.name}</td>
              <td>{itens.rotation_period}</td>
              <td>{itens.orbital_period}</td>
              <td>{itens.diameter}</td>
              <td>{itens.climate}</td>
              <td>{itens.gravity}</td>
              <td>{itens.terrain}</td>
              <td>{itens.surface_water}</td>
              <td>{itens.population}</td>
              <td>{itens.films}</td>
              <td>{itens.created}</td>
              <td>{itens.edited}</td>
              <td>{itens.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
