import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function FiltersChoised() {
  const {
    filters: { filterByNumericValues },
    sets: { setFilters } } = useContext(MainContext);

  return (
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      <table border="1">
        <thead>
          <tr>
            <th>Filtro</th>
            <th>Faixa</th>
            <th>Valor</th>
            <th>Excluir Filtro</th>
          </tr>
        </thead>
        <tbody>
          { filterByNumericValues.map((filter) => (
            <tr key={ filter }>
              <th>{ filter.column }</th>
              <th>{ filter.comparison }</th>
              <th>{ filter.value }</th>
              <button
                type="button"
                style={ { width: '100%' } }
                onClick={ () => setFilters((oldFilters) => ({
                  ...oldFilters,
                  filterByNumericValues: [
                    ...oldFilters.filterByNumericValues
                      .filter((filter2) => filter2 !== filter),
                  ],
                })) }
              >
                X
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FiltersChoised;
