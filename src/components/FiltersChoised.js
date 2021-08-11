import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function FiltersChoised() {
  const {
    filters: { filterByNumericValues },
    sets: { setFilters, setListFilter } } = useContext(MainContext);

  function handleDelete(filter) {
    setFilters((oldFilters) => ({
      ...oldFilters,
      filterByNumericValues: [
        ...oldFilters.filterByNumericValues
          .filter((filter2) => filter2 !== filter),
      ],
    }));
    setListFilter((oldValues) => ([
      ...oldValues,
      filter.column,
    ]));
  }

  return (
    <>
      <div style={ { display: 'flex', justifyContent: 'center' } }>
        <p style={ { margin: '10px' } }>Filtro</p>
        <p style={ { margin: '10px' } }>Comparação</p>
        <p style={ { margin: '10px' } }>Valor</p>
        <p style={ { margin: '10px' } }>Excluir</p>
      </div>
      <div>
        { filterByNumericValues.map((filter, index) => (
          <div
            key={ index }
            style={ { display: 'flex', justifyContent: 'center' } }
            data-testid="filter"
          >
            <p style={ { margin: '10px' } }>{ filter.column }</p>
            <p style={ { margin: '10px' } }>{ filter.comparison }</p>
            <p style={ { margin: '10px' } }>{ filter.value }</p>
            <button
              type="button"
              onClick={ () => handleDelete(filter) }
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
