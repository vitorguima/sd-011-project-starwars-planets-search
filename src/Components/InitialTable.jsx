import React from 'react';
import GetDataFromAPI from '../Hooks/GetDataFromAPI';

const errorMsg = <p>Erro ao fazer requisição! Contate o administrador do sistema!</p>;

function InitialTable() {
  const [APIdata, APIerror] = GetDataFromAPI();
  if (APIerror) {
    return errorMsg;
  }

  return (
    <div>Ola</div>
  );
}

export default InitialTable;
