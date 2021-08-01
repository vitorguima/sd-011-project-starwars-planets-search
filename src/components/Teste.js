import React, { useContext } from 'react';
import TableContext from './TableContext';

function Teste() {

}
function Testando() {
  const { TableInfos } = useContext(TableContext);
  const { hello } = TableInfos;
  return (
    <div>
      { hello }
    </div>
  );
}

export {
  Testando,
  Teste,

};
