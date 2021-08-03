import React from 'react';
import Context from './context/Context';

function FormPlanets() {
  const {
    filters,
    setFilters,
  } = React.useContext(Context);

  const handleChange = ({ target }) => {
    // console.log({
    //   ...filterByName,
    //   filters: {
    //     filterByName: {
    //       name: target.value,
    //     },
    //   },
    // });

    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
  };

  const handleValues = () => {
    const column = document.getElementById('column-filter').value;
    const comparison = document.getElementById('comparison-filter').value;
    const input = document.getElementById('value-filter').value;
    setFilters({
      ...filters,
      filterByNumericValues: [
        {
          column,
          comparison,
          value: input,
        },
      ],
    });
  };

  function optionsFilter() {
    const columnNames = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];

    const { filterByNumericValues } = filters;

    if (filterByNumericValues.length === 0) {
      return (
        <select id="column-filter" data-testid="column-filter">
          {columnNames.map((columnName, index) => (
            <option key={ index }>{ columnName }</option>))}
        </select>
      );
    }

    const { column } = filterByNumericValues[0];
    const filteredOptions = columnNames.filter((columnName) => (columnName !== column));

    return (
      <select id="column-filter" data-testid="column-filter">
        { filteredOptions.map((columnName, index) => (
          <option key={ index }>{ columnName }</option>)) }
      </select>
    );
  }

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          type="text"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>

      { optionsFilter() }
      {/* <label htmlFor="values-filter">
        <select data-testid="column-filter" onChange={ handleValues }>
          <option key="1" value="population">population</option>
          <option key="2" value="orbital_period">orbital_period</option>
          <option key="3" value="diameter">diameter</option>
          <option key="4" value="rotation_period">rotation_period</option>
          <option key="5" value="surface_water">surface_water</option>
        </select>
      </label> */}

      <select
        data-testid="comparison-filter"
        id="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        id="value-filter"
      />

      <button
        type="submit"
        data-testid="button-filter"
        onClick={ handleValues }
      >
        Filtrar
      </button>

    </div>
  );
}

export default FormPlanets;
