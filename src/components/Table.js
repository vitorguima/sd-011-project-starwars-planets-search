import React, { useContext, useEffect } from 'react';
// import '../App.css';
import PlanetsContext from '../contexts/PlanetsContext';

function Table() {
  const { fetchSuccess: { results }, choosenPlanets } = useContext(PlanetsContext);

  useEffect(() => { // Para teste
    if (results) {
      console.log('Abaixo choosenPlanets em Table.js');
      console.log(choosenPlanets);
    }
  });

  function tableHead() {
    return (
      results && Object.keys(results[0]).map((header, i) => { // Filtra as Keys do primeiro índice só pra pegar cabeçalho pra Tabela
        if (header !== 'residents') {
          return <th className="thead" key={ i }>{header}</th>;
        }
        return null;
      })
    );
  }

  function tableBody() {
    const planets = (!choosenPlanets ? results : choosenPlanets);
    return (
      <div>
        <h1>Planetas</h1>
        <table>
          <thead>
            <tr>
              {tableHead()}
            </tr>
          </thead>
          <tbody>
            {planets && planets.map((planet, index) => (
              <tr key={ index }>
                {Object.values(planets[index]).map((spec, indice) => {
                  const header = Object.keys(planets[index])[indice]; // Pega a chave do índice atual
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

  return (
    <div>
      {
        tableBody()
      }
    </div>

  );
}

export default Table;
