import React from 'react';
import { Context } from '../Services/Context/GlobalContext';
import { columnOptions,
  comparisonOptions,
  INITIAL_NUM_FILTER,
  filterComparisonNumber } from '../Services/data';

const Table = () => {
  const { data, request } = React.useContext(Context);
  const [filteredData, setFilteredData] = React.useState([]);
  const [filter, setFilter] = React.useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const [filterComparison, setFilterComparison] = React.useState(INITIAL_NUM_FILTER);

  React.useEffect(() => { request(); }, [request]);
  React.useEffect(() => { if (data) setFilteredData(data); }, [data]);
  React.useEffect(() => {
    if (data) {
      const newArray = data.filter((planet) => {
        const { name, ...rest } = planet;
        const nameContains = name.toLowerCase()
          .includes(filter.filterByName.name.toLowerCase());
        const comparisonValue = filterComparisonNumber(filter, rest);
        return comparisonValue && nameContains;
      });
      setFilteredData(newArray);
    }
  }, [filter, data]);

  if (!data) {
    return null;
  }

  let headerTable = [];
  if (filteredData.length > 0) {
    headerTable = Object.keys(filteredData[0]);
  }

  function numbericFilter({ target: { value, name } }) {
    setFilterComparison({ ...filterComparison, [name]: value });
  }

  const filteredColumnOptions = columnOptions
    .filter((item) => !filter.filterByNumericValues
      .map(({ column }) => column).includes(item));
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ ({ target }) => setFilter({
          ...filter, filterByName: { name: target.value } }) }
      />
      <select
        name="column"
        data-testid="column-filter"
        onChange={ (e) => numbericFilter(e) }
      >
        {filteredColumnOptions
          .map((option) => (<option key={ option }>{option}</option>))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ (e) => numbericFilter(e) }
      >
        {comparisonOptions.map((option) => (<option key={ option }>{option}</option>))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ filterComparison.value }
        onChange={ (e) => numbericFilter(e) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setFilter({
            ...filter,
            filterByNumericValues: [...filter.filterByNumericValues, filterComparison],
          });
          setFilterComparison(INITIAL_NUM_FILTER);
        } }
      >
        Filtrar
      </button>
      {filter.filterByNumericValues.map(({ column, value, comparison }) => (
        <p key={ column } data-testid="filter">
          {`${column} ${comparison} ${value}`}
          <button
            type="button"
            onClick={ () => {
              setFilter({
                ...filter,
                filterByNumericValues: filter.filterByNumericValues
                  .filter((item) => item.column !== column) });
            } }
          >
            X
          </button>
        </p>
      ))}
      <table>
        <thead>
          <tr>
            {headerTable.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => {
            const {
              name,
              rotation_period: rotationPeriod,
              orbital_period: orbitPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,
            } = item;
            return (
              <tr key={ name }>
                <td>{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>{films}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
