import React, { useContext } from 'react';
import AppContext from '../ContextAPI_Configs/AppContext';
import GetDataFromAPI from '../Hooks/GetDataFromAPI';
import HeaderMainColumn from './HeaderMainColumn';
import PlanetsInformation from './PlanetsInformation';
import SearchInput from './SearchInput';

const errorMsg = <p>Erro ao fazer requisição! Contate o administrador do sistema!</p>;

function Table() {
  const { userInput } = useContext(AppContext);
  const { filters: { filterByName: { name } } } = userInput;
  const [data, APIerror] = GetDataFromAPI();

  if (data === null) return <p>Carregando...</p>;
  if (APIerror) return errorMsg;

  const columnInformation = Object.keys(data[0]);
  const planetsInformation = data.filter((planet) => planet.name.includes(name));

  return (
    <>
      <SearchInput />
      <table>
        <tr>
          {columnInformation
            .map((info) => <HeaderMainColumn key={ info } info={ info } />)}
        </tr>
        {planetsInformation
          .map((planet, index) => (<PlanetsInformation key={ index } info={ planet } />))}
      </table>
    </>
  );
}
export default Table;
