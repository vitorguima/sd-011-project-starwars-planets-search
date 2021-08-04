import React, { useContext } from 'react';
import AppContext from '../ContextAPI_Configs/AppContext';
import GetDataFromAPI from '../Hooks/GetDataFromAPI';
import HeaderMainColumn from './HeaderMainColumn';
import PlanetsInformation from './PlanetsInformation';
import SearchInput from './SearchInput';
import ColumnFilter from './Filters/ColumnFilter';
import ComparisonFilter from './Filters/ComparisonFilter';
import ValueFilter from './Filters/ValueFilter';
import ApplyFilter from './Filters/ApplyFilter';
import UsedFilters from './Filters/UsedFilters';

const errorMsg = <p>Erro ao fazer requisição! Contate o administrador do sistema!</p>;

function Table() {
  const { userFilter } = useContext(AppContext);
  const { filters: { filterByName: { name }, filterByNumericValues } } = userFilter;
  const [data, APIerror] = GetDataFromAPI();

  if (data === null) return <p>Carregando...</p>;
  if (APIerror) return errorMsg;

  const columnInformation = Object.keys(data[0]);

  const planetsInformation = data.filter((planet) => planet.name.includes(name));

  return (
    <>
      <SearchInput />
      <ColumnFilter />
      <ComparisonFilter />
      <ValueFilter />
      <ApplyFilter />
      <UsedFilters />
      <table>
        <tr>
          {columnInformation
            .map((info) => <HeaderMainColumn key={ info } info={ info } />)}
        </tr>
        {planetsInformation
          .filter((planet) => {
            let isEqual = true;
            filterByNumericValues.forEach((filter) => {
              const { column, value, comparison } = filter;
              switch (comparison) {
              case 'menor que':
                isEqual = Number(planet[column]) < Number(value) && isEqual;
                break;
              case 'maior que':
                isEqual = Number(planet[column]) > Number(value) && isEqual;
                break;
              case 'igual a':
                isEqual = Number(planet[column]) === Number(value) && isEqual;
                break;
              default:
                return null;
              }
            });
            return isEqual;
          })
          .map((planet, index) => (<PlanetsInformation key={ index } info={ planet } />))}
      </table>
    </>
  );
}
export default Table;
