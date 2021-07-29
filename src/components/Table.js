import React, { useEffect, useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data } = useContext(MyContext);
  const [filters, filteredObj] = useState({ filterNumValues: 'population' });
  const [filtersNam, filtered] = useState();
  const [arrayFiltered, submitSearch] = useState([]);
  const arrayDropDown = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  useEffect(() => {
    filtered();
  }, []);
  // console.log(filtersNam);

  // console.log(arrayFiltered);

  console.log(filters);

  const planets1 = data.filter((planet) => (filtersNam ? planet.name.toLowerCase()
    .includes(filtersNam.filterName.toLowerCase()) : data));
  return (
    <div>
      <label htmlFor="input">
        <input
          data-testid="name-filter"
          onChange={ (e) => filtered({ ...filtersNam, filterName: e.target.value }) }
        />
      </label>
      <form method="GET">
        <select
          data-testid="column-filter"
          onChange={ (e) => filteredObj({ ...filters, filterNumValues: e.target.value }) }
        >
          { arrayDropDown.map((elements, index) => (
            <option
              className="optionss"
              value={ elements }
              key={ `key${index}` }
            >
              { elements }
            </option>
          )) }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (e) => filteredObj({
            ...filters, filterComparision: e.target.value }) }
        >
          <option className="comparision">maior que</option>
          <option className="comparision">igual a</option>
          <option className="comparision">menor que</option>
        </select>
        <label htmlFor="input">
          <input
            type="number"
            data-testid="value-filter"
            onChange={ (e) => filteredObj({ ...filters, filterNumber: e.target.value }) }
          />
        </label>
        <button
          type="button"
          value="GET"
          onClick={ () => submitSearch(data.filter((e) => e)) }
        >
          Pesquisar
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            { data.map((planets) => Object.keys(planets)
              .filter((el) => el !== 'residents')
              .map((keysPlanets, index) => (
                <th
                  key={ `key ${index}` }
                >
                  {keysPlanets}
                </th>)))[0] }
          </tr>
        </thead>
        <tbody>
          { planets1.map((planets, index) => (
            <tr key={ `key ${index}` }>
              { Object.entries(planets)
                .filter((element) => !element.includes('residents'))
                .map((planet, i) => (<td key={ `key ${i}` }>{planet[1]}</td>)) }
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
