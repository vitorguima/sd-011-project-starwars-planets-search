import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterPlanets() {
  // estado global
  const {
    filters,
    setFilters,
  } = useContext(PlanetsContext);

  // estado local
  const [numericHeaders, setNumericHeaders] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const [usedHeadersFilters, setUsedHeadersFilters] = useState([]);

  const [localFilters, setLocalFilters] = useState({
    column: 'population',
    comparison: '',
    value: '',
  });

  // funcoes
  const handleFilterByName = (event) => {
    const { value } = event.target;
    setFilters({ // modifica estado global
      ...filters,
      filterByName: { name: value.toLowerCase() },
    });
  };

  const handleFilterLocally = (event) => {
    const { value, name } = event.target;
    setLocalFilters({ // modifica estado local
      ...localFilters,
      [name]: value,
    });
  };

  // useEffect(() => (
  //   setLocalFilters({
  //     ...localFilters,
  //     column: numericHeaders[0],
  //   })
  // ), [localFilters, numericHeaders]);

  const handleClickFilters = () => {
    const headers = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];
    const five = 5;

    setFilters({ // modifica estado global
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, localFilters],
    });

    setUsedHeadersFilters([...usedHeadersFilters, localFilters.column]); // modifica estado local

    setNumericHeaders(headers.filter((header) => header !== localFilters.column));

    console.log(` antes: ${numericHeaders}`);

    if (numericHeaders < five) {
      setNumericHeaders(headers
        .filter((header) => !usedHeadersFilters.includes(header))); // modifica estado local
    }

    console.log(` antes: ${numericHeaders}`);

    setLocalFilters({
      ...localFilters,
      column: numericHeaders[0],
    });
  };

  // render
  const { name } = filters.filterByName;
  return (
    <form>
      <label htmlFor="name-filter">
        Search by name:
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          value={ name }
          onChange={ handleFilterByName }
        />
      </label>
      <label htmlFor="column-filter">
        Select a filter:
        <select
          id="column-filter"
          data-testid="column-filter"
          name="column"
          onChange={ handleFilterLocally }
        >
          {/* <option>select</option> */}
          { numericHeaders.map((header) => (
            <option key={ header }>{ header }</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleFilterLocally }
        >
          <option>select</option>
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          name="value"
          min="0"
          onChange={ handleFilterLocally }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickFilters }
      >
        Filter
      </button>
    </form>
  );
}

export default FilterPlanets;
