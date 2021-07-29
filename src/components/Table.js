import React, { useContext } from 'react';
// import '../App.css';
import PlanetsContext from '../contexts/PlanetsContext';

function Table() {
  const { fetchSuccess: { results } } = useContext(PlanetsContext);
  return (
    <div>
      <h1>Eu sou o table</h1>
      <table>
        <thead>
          <tr>
            {results && Object.keys(results[0]).map((header, i) => { // Filtra as Keys do primeiro índice só pra pegar cabeçalho pra Tabela
              if (header !== 'residents') {
                return <th className="thead" key={ i }>{header}</th>;
              }
              return null;
            })}
          </tr>
        </thead>
        <tbody>
          {results && results.map((planet, index) => (
            <tr key={ index }>
              {Object.values(results[index]).map((spec, indice) => {
                const header = Object.keys(results[index])[indice]; // Pega a chave do índice atual
                if (header !== 'residents') {
                  return <td className="cell" key={ indice }>{spec}</td>;
                }
                return null;
              })}
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
