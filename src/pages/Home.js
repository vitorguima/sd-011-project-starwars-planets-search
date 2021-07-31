import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../utils/AppContext';
import FetchPlanets from '../services';
import Table from '../components/Table';
import FiltersInUse from '../components/FiltersInUse';
import Ordenator from '../components/Ordenator';

function Home() {
  const {
    setPlanets,
    setFilters,
    filters,
    filtersToUse,
    setFiltersToUse,
  } = useContext(AppContext);

  const [inputsFilters, setInputsFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    FetchPlanets().then((data) => setPlanets(data));
  }, [setPlanets]);

  useEffect(() => {
    setInputsFilters({ ...inputsFilters, column: filtersToUse[0] });
  }, [filtersToUse]);

  const filterByName = ({ target: { name, value } }) => {
    setFilters({
      ...filters,
      filterByName: { [name]: value },
    });
  };

  const filterByNumericValues = (newFilter) => {
    if (setFiltersToUse.length > 0) {
      setFiltersToUse(filtersToUse.filter((filter) => filter !== newFilter.column));
    }
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, newFilter],
    });
  };

  const handleSetInputs = ({ target: { name, value } }) => {
    setInputsFilters({
      ...inputsFilters,
      [name]: value,
    });
  };

  const selectsCompare = [
    'maior que',
    'menor que',
    'igual a',
  ];

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="name"
        value={ filters.filterByName.name }
        onChange={ filterByName }
      />
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleSetInputs }
      >
        {filtersToUse.map((value, index) => (
          <option value={ value } key={ index }>{value}</option>
        ))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleSetInputs }
      >
        {selectsCompare.map((value, index) => (
          <option value={ value } key={ index }>{value}</option>
        ))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleSetInputs }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => filterByNumericValues(inputsFilters) }
      >
        Filtrar
      </button>
      <FiltersInUse />
      <Ordenator />
      <Table />
    </div>
  );
}

export default Home;
