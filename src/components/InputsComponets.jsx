import React, { useContext } from 'react';
import { StarWarsContext } from '../context/Provider';

function tableComponents(data, filters, setFilters) {
  const headerTable = () => (
    <thead>
      <tr>
        {Object.keys(data[0])
          .map((titulo) => (<th key={ titulo }>{titulo}</th>))}
      </tr>
    </thead>
  );

  const bodyTable = () => (
    <tbody>
      {data.filter((planet) => planet.name.toLowerCase().includes(filters.filterByName))
        .map((element) => (
          <tr key={ element.name }>
            {Object.values(element)
              .map((value) => <td key={ value } data-testid="planet-name">{value}</td>)}
          </tr>))}
    </tbody>
  );

  const handleChange = (e) => (
    setFilters({
      ...filters,
      filterByName: e.target.value.toLowerCase(),
    })
  );

  const inputSearch = () => (
    <input
      data-testid="name-filter"
      onChange={ handleChange }
    />
  );

  return (
    <>
      { headerTable() }
      { bodyTable() }
      { inputSearch() }
    </>
  );
}

function InputsComponents() {
  const { data, filters, setFilters } = useContext(StarWarsContext);

  return (
    tableComponents(data, filters, setFilters)
  );
}

export default InputsComponents;
