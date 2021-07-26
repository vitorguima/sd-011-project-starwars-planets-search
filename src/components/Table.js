import React, { useContext, useState } from 'react';
import { GlobalContext } from '../GlobalContext';
import Filters from './Filters';

export default function Table() {
  const global = useContext(GlobalContext);
  const { loading, data, finalFilter } = global;
  const [search, setSearchName] = useState({ filters: { filterByName: { name: '' } } });

  if (loading) return <div>Carregando...</div>;

  const filterPlanetName = data.results.filter((item) => (
    item.name.includes(search.filters.filterByName.name)
  ));

  let listAtt = filterPlanetName;

  const handleFilterCase = () => {
    if (finalFilter.filterByNumericValues.lenght > 0) {
      switch (finalFilter.filterByNumericValues.comparison) {
      case 'maior que':
        listAtt = listAtt.filter((item) => (item[finalFilter.filterByNumericValues
          .column] > Number(finalFilter.filterByNumericValues.value)));
        break;
      case 'menor que':
        listAtt = listAtt.filter((item) => (item[finalFilter.filterByNumericValues
          .column] < Number(finalFilter.filterByNumericValues.value)));
        break;
      case 'igual a':
        listAtt = listAtt.filter((item) => (item[finalFilter.filterByNumericValues
          .column] === Number(finalFilter.filterByNumericValues.value)));
        break;
      default:
        break;
      }
    }
    return listAtt;
  };

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
          {listAtt && listAtt.map((itens, index) => (
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
