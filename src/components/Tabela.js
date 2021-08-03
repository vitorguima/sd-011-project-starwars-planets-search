import React, { useContext } from 'react';
import TabelaContext from '../context/TabelaContext';
import TabelaBody from './TabelaBody';
import TabelaHeader from './TabelaHeader';
import Formularios from './Formularios';

export default function Tabela() {
  const { isLoading } = useContext(TabelaContext);
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <Formularios />
      <table>
        <TabelaHeader />
        <TabelaBody />
      </table>
    </div>
  );
}
