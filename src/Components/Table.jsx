import React from 'react';
import GetDataFromAPI from '../Hooks/GetDataFromAPI';
import HeaderMainColumn from './HeaderMainColumn';
import PlanetsInformation from './PlanetsInformation';

const errorMsg = <p>Erro ao fazer requisição! Contate o administrador do sistema!</p>;

function Table() {
  const [data, APIerror] = GetDataFromAPI();

  if (data === null) return <p>Carregando...</p>;
  if (APIerror) return errorMsg;

  const columnInformation = Object.keys(data[0]);
  const planetsInformation = data.map((planet) => Object.values(planet));

  return (
    <table>
      <tr>
        {columnInformation.map((info) => <HeaderMainColumn key={ info } info={ info } />)}
      </tr>
      {planetsInformation.map((planet, index) => (
        <tr key={ index }>
          <PlanetsInformation info={ planet } />
        </tr>))}
    </table>

  );
}
export default Table;
