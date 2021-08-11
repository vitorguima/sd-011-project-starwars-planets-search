import React, { useContext, useState } from 'react';
import { MyContext } from '../context/MyContext';
// import { MyContext } from '../context/MyContext';

function NumericFilter() {
  const { setSearchPlanet } = useContext(MyContext);
  const [getColumn, setColumn] = useState('population');
  const [getComparison, setComparison] = useState('menor que');
  const [getInput, setInput] = useState(0);

  // useEffect(() => {
  //   console.log(searchPlanet);
  //   // setSearchPlanet();
  // }, [searchPlanet]);

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ (e) => setColumn(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="menor que">menor que</option>
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        onChange={ (e) => setInput(e.target.value) }
        type="number"
      />

      <button
        data-testid="button-filter"
        onClick={ () => setSearchPlanet([
          { column: getColumn }, { comparison: getComparison }, { value: getInput },
        ]) }
        type="button"
      >
        Buscar
      </button>
    </div>
  );
}

export default NumericFilter;
