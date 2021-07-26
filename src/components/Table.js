import React, { useContext, useState } from 'react';

import PlanetsContext from '../context/PlanetsContext';
import TableElements from './TableElements';
import HeaderTable from './HeaderTable';

function Table() {
  const { data } = useContext(PlanetsContext);
  const [filterPlanets, setFilterPlanets] = useState(''); // uso atualizar valor input por nome
  const [column, setSelectColumnFilter] = useState(''); // select tipo de filtro
  const [comp, setSelectComparisonFilter] = useState(''); // select comparação(maior,menor,igual)
  const [inputValueFilter, setInputValueFilter] = useState(0); // input do valor numérico
  const [updateTabel, setUpdateTableBySelect] = useState(false);
  const selectOptions = [
    { value: 'population', label: 'population' },
    { value: 'orbital_period', label: 'orbital_period' },
    { value: 'diameter', label: 'diameter' },
    { value: 'rotation_period', label: 'rotation_period' },
    { value: 'surface_water', label: 'surface_water' },
  ];

  // const orderNames = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV' ];
  // Qual objeto do array de objetos (data) possui o name === orderNames(index), quando encontrar o objeto
  // <TableElements planet = {planet} />
  // function renderByName() {
  //   const order = orderNames.forEach((element, index) => {
  //     const nameFilters = data.filter(planet => planet.name === element);
  //   });
  // }

  function renderTableInputByName(input) {
    const nameFilters = data.map((planet) => {
      if (input === '' || (planet.name.toLowerCase()).includes(input.toLowerCase())) {
        return (
          <TableElements key={ planet.name } planet={ planet } />
        );
      }
      return null;
    });
    return (
      <tbody>{nameFilters}</tbody>
    );
  }

  function renderTableInputBySelect(inputString) {
    const input = parseInt(inputString, 10);
    const nameFilters = data.map((x) => {
      const numb = parseInt(x[`${column}`], 10);
      if ((comp === 'maior que') && ((numb > input) && (x[`${column}`] !== 'unknown'))) {
        return (
          <TableElements key={ x.name } planet={ x } />
        );
      }
      if ((comp === 'menor que') && ((numb < input) && (x[`${column}`] !== 'unknown'))) {
        return (
          <TableElements key={ x.name } planet={ x } />
        );
      }
      if ((comp === 'igual a') && ((numb === input) && (x[`${column}`] !== 'unknown'))) {
        return (
          <TableElements key={ x.name } planet={ x } />
        );
      }
      return null;
    });
    return (
      <tbody>
        {nameFilters}
      </tbody>
    );
  }

  const updateOptions = () => {
    const renderOptions = selectOptions.map((item) => {
      if (!updateTabel) {
        return <option key={ item.value } value={ item.value }>{item.value}</option>;
      }
      if (item.value !== column) {
        return <option key={ item.value } value={ item.value }>{item.value}</option>;
      } return null;
    });
    return renderOptions;
  };

  function renderAllTables() {
    if (!updateTabel) {
      return renderTableInputByName(filterPlanets);
    }
    return renderTableInputBySelect(inputValueFilter);
  }

  return (
    <div>
      <div>
        <p>Filtrar por Nome</p>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (event) => setFilterPlanets(event.target.value) }
        />
      </div>

      <div>
        <p>Filtrar por valores numéricos</p>

        { /* FILTRO 1 */ }
        <div data-testid="filter">
          <select
            onChange={ (e) => setSelectColumnFilter(e.target.value) }
            name="column-filter"
            data-testid="column-filter"
          >
            {updateOptions()}
          </select>
          <button type="button" onClick={ () => setUpdateTableBySelect(false) }>X</button>
          <br />
        </div>

        { /* FILTRO 2 */ }
        <div data-testid="filter">
          <select
            onChange={ (e) => setSelectComparisonFilter(e.target.value) }
            name="comparison-filter"
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <button
            type="button"
            data-testid="filter"
            onClick={ () => setUpdateTableBySelect(false) }
          >
            X
          </button>
          <br />
        </div>

        { /* FILTRO 3 */ }
        <div data-testid="filter">
          <input
            type="text"
            data-testid="value-filter"
            onChange={ (event) => setInputValueFilter(event.target.value) }
          />
          <button
            type="button"
            data-testid="filter"
            onClick={ () => setUpdateTableBySelect(false) }
          >
            X
          </button>
          <br />
        </div>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => setUpdateTableBySelect(true) }
        >
          Filtrar
        </button>

        { /* ESCOLHER ORDENAÇÃO */ }
        <div>
          <p>Ordenar</p>
          <select data-testid="column-sort">
            <option value="">Name</option>
            <option value="">Climate</option>
            <option value="">Created</option>
            <option value="">Diameter</option>
            <option value="">Edited</option>
            <option value="">Films</option>
            <option value="">Gravity</option>
            <option value="">Orbital Period</option>
            <option value="">Population</option>
            <option value="">Rotation Period</option>
            <option value="">Surface Water</option>
            <option value="">Terrain</option>
            <option value="">URL</option>
          </select>
          <br />
          <label htmlFor="column-sort-input-asc">
            Ascendente
            <input
              type="radio"
              data-testid="column-sort-input-asc"
              value="ASC"
              name="order"
            />
          </label>
          <br />
          <label htmlFor="column-sort-input-desc">
            Descendente
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              value="DESC"
              name="order"
            />
          </label>
          <br />
          <button type="button" data-testid="column-sort-button">ORDENAÇÃO</button>
        </div>

      </div>
      <table>
        <thead>
          <HeaderTable />
        </thead>
        { renderAllTables() }
      </table>
    </div>
  );
}

export default Table;
