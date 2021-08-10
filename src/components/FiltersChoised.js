import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function FiltersChoised() {
  const {
    filters: { filterByNumericValues },
    sets: { setFilters } } = useContext(MainContext);

  return (
    <>
      <div style={ { display: 'flex', justifyContent: 'center' } }>
        <p style={ { margin: '10px' } }>Filtro</p>
        <p style={ { margin: '10px' } }>Comparação</p>
        <p style={ { margin: '10px' } }>Valor</p>
        <p style={ { margin: '10px' } }>Excluir</p>
      </div>
      <div>
        { filterByNumericValues.map((filter) => (
          <div key={ filter } style={ { display: 'flex', justifyContent: 'center' } }>
            <p style={ { margin: '10px' } }>{ filter.column }</p>
            <p style={ { margin: '10px' } }>{ filter.comparison }</p>
            <p style={ { margin: '10px' } }>{ filter.value }</p>
            <button
              type="button"
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
          </div>
        ))}
      </div>
    </>
  );
}

export default FiltersChoised;
