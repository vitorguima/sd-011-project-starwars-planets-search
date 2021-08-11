import React, { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';

export default function Table() {
  const { data,
    filterPlanets,
    setFilterPlanets,
    column,
    setColumn,
  } = useContext(Context);
  const [storeFilterPlanets, setStoreFilterPlanets] = useState([]);
  const [saveSelectColumn, setSaveSelectColumn] = useState(column[0]);
  const [saveSelectComparative, setSaveSelectComparative] = useState('maior que');
  const [saveInputValue, setSaveInputValue] = useState(0);
  const [storeColumn] = useState(column);
  const { name } = filterPlanets.filterByName;

  const filterNames = ({ target }) => {
    setFilterPlanets({
      ...filterPlanets,
      filterByName: { name: target.value },
    });
  };

  const selectedValues = () => {
    setFilterPlanets({
      ...filterPlanets,
      filterByNumericValues: [
        ...filterPlanets.filterByNumericValues, {
          column: saveSelectColumn,
          comparison: saveSelectComparative,
          value: saveInputValue,
        },
      ],
    });
  };

  useEffect(() => {
    const { filterByNumericValues: number } = filterPlanets;
    let getPlanetData = data.filter((planet) => planet
      .name.toLowerCase().includes(name));

    if (number.length) {
      number.forEach((filter) => {
        if (filter.comparison === 'maior que') {
          getPlanetData = getPlanetData
            .filter((planetData) => parseInt(
              planetData[filter.column], 10,
            ) > filter.value);
        }
        if (filter.comparison === 'menor que') {
          getPlanetData = getPlanetData
            .filter((planetData) => parseInt(
              planetData[filter.column], 10,
            ) < filter.value);
        }
        if (filter.comparison === 'igual a') {
          getPlanetData = getPlanetData
            .filter((planetData) => planetData[filter.column]
             === filter.value);
        }
      });
    }
    setStoreFilterPlanets(getPlanetData);
  }, [data, filterPlanets, name, setStoreFilterPlanets]);

  const showAndDelete = () => {
    const { filterByNumericValues: number } = filterPlanets;
    return number.map((value, index) => (
      <div key={ value.column } data-testid="filter">
        <span>{ `${value.column} ${value.comparison} ${value.value}` }</span>
        <button
          type="button"
          onClick={ async () => {
            number.splice(index, 1);
            await setFilterPlanets(({
              ...filterPlanets,
              filterByNumericValues: number,
            }));
            const columns = document.querySelector('#column').value;
            setColumn(columns);
          } }
        >
          X
        </button>
      </div>
    ));
  };

  return (
    <>
      <h1>In the Table</h1>
      <fieldset>
        <label htmlFor="filter-label">
          Filtro:
          <input
            type="text"
            data-testid="name-filter"
            onChange={ filterNames }
          />
        </label>
        <label htmlFor="select-label">
          Filtrar por valor:
          <select
            data-testid="column-filter"
            id="column"
            onChange={ ({ target }) => setSaveSelectColumn(target.value) }
          >
            {
              storeColumn.map(
                (columns) => (
                  <option
                    key={ columns }
                    value={ columns }
                  >
                    {columns}
                  </option>),
              )
            }
          </select>
        </label>
        <label htmlFor="select-comparison-label">
          Comparação:
          <select
            data-testid="comparison-filter"
            onChange={ ({ target }) => setSaveSelectComparative(target.value) }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="input-label">
          Valor:
          <input
            type="number"
            min="0"
            data-testid="value-filter"
            onChange={ ({ target }) => setSaveInputValue(target.value) }
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ selectedValues }
        >
          Filtrar
        </button>
        {showAndDelete()}
      </fieldset>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Período de Rotação</th>
            <th>Período Orbital</th>
            <th>Diametro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Água na Superfície</th>
            <th>População</th>
            <th>Filmes</th>
            <th>Criado</th>
            <th>Editado</th>
            <th>url</th>
          </tr>
        </thead>

        <tbody>
          {storeFilterPlanets.map((planets) => (
            <tr key={ planets.name }>
              <td>{planets.name}</td>
              <td>{planets.rotation_period}</td>
              <td>{planets.orbital_period}</td>
              <td>{planets.diameter}</td>
              <td>{planets.climate}</td>
              <td>{planets.gravity}</td>
              <td>{planets.terrain}</td>
              <td>{planets.surface_water}</td>
              <td>{planets.population}</td>
              <td>{planets.films}</td>
              <td>{planets.created}</td>
              <td>{planets.edited}</td>
              <td>{planets.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
