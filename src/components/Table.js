import React, { useEffect, useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data } = useContext(MyContext);
  const [filters, filteredObj] = useState({ filterNumValues: 'population',
    comp: 'maior que' });
  const [filtersNam, filtered] = useState();
  const [arrayFiltered, submitSearch] = useState([]);
  const arrayDropDown = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const planets1 = data.filter((planet) => (filtersNam ? planet.name.toLowerCase()
    .includes(filtersNam.filterName.toLowerCase()) : data));
  const setData = ({ filterNumValues, comp }) => {
    const data2 = data.filter((e) => {
      if (comp === 'maior que' && parseInt(e[filterNumValues], 10) !== null) {
        return parseInt(e[filterNumValues], 10) > parseInt((filters.filterNumber), 10);
      }
      if (comp === 'igual a' && parseInt(e[filterNumValues], 10) !== null) {
        return parseInt(e[filterNumValues], 10) === parseInt((filters.filterNumber), 10);
      }
      if (comp === 'menor que' && parseInt(e[filterNumValues], 10) !== null) {
        return parseInt(e[filterNumValues], 10) < parseInt((filters.filterNumber), 10);
      }
      return data;
    });
    return submitSearch({ ...arrayFiltered, arr: data2 });
  };

  useEffect(() => {
    filtered();
  }, []);
  const compare = arrayFiltered.arr ? arrayFiltered.arr : planets1;
  return (
    <div>
      <label htmlFor="input">
        <input
          data-testid="name-filter"
          onChange={ (e) => filtered({ ...filtersNam, filterName: e.target.value }) }
        />
      </label>
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
        onChange={ (e) => filteredObj({ ...filters, comp: e.target.value }) }
      >
        <option>maior que</option>
        <option>igual a</option>
        <option>menor que</option>
      </select>
      <label htmlFor="input">
        <input
          type="number"
          data-testid="value-filter"
          onChange={ (e) => filteredObj({ ...filters, filterNumber: e.target.value }) }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => setData(filters) }
      >
        Pesquisar
      </button>
      <table className="table">
        <thead>
          <tr>
            { data.map((planets) => Object.keys(planets)
              .filter((el) => el !== 'residents')
              .map((keysPlanets, index) => (
                <th key={ `key ${index}` }>
                  {keysPlanets}
                </th>)))[0] }
          </tr>
        </thead>
        <tbody>
          { compare.map((planets, index) => (
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
