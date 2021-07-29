import React, { useContext } from 'react';
// import '../App.css';
import { PlanetsContext } from '../contexts/PlanetsContext.js';

function Table() {
const { fetchSuccess: { results } } = useContext(PlanetsContext);
    return (
        <div>
            <h1>Eu sou o table</h1>
            <table>
              <thead><tr>{results && Object.keys(results[0]).map((header) => { // Filtra as Keys do primeiro índice só pra pegar cabeçalho pra Tabela
              if (header !== 'residents') {
                return <th className="cell" key={header}>{header}</th>
              }
            })}</tr></thead>
              {/* {results && results.map((value) => )} */}
            </table>
        </div>
    )
}

export default Table;