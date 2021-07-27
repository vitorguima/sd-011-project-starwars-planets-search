import PropTypes from 'prop-types';
import React from 'react';

const DirectionFilter = ({ options, setOrder, filter }) => {
  const [direction, setDirection] = React.useState({
    column: 'name',
    sort: 'ASC',
  });

  return (
    <>
      <select
        data-testid="column-sort"
        name="column"
        onChange={ ({ target }) => setDirection({ ...direction, column: target.value }) }
      >
        {options.map((value) => (
          <option name="column" value={ value } key={ value }>{value}</option>))}
      </select>
      <label htmlFor="ASC">
        Ascendente
        <input
          id="ASC"
          value="ASC"
          type="radio"
          name="direction"
          onChange={ ({ target }) => setDirection({
            ...direction, sort: target.value }) }
          data-testid="column-sort-input-asc"
        />
      </label>
      <label htmlFor="DESC">
        Descendente
        <input
          id="DESC"
          value="DESC"
          name="direction"
          type="radio"
          onChange={ ({ target }) => setDirection({ ...direction, sort: target.value }) }
          data-testid="column-sort-input-desc"
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setOrder({ ...filter, order: direction }) }
      >
        Aplicar Ordenação
      </button>
    </>
  );
};

DirectionFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  setOrder: PropTypes.func.isRequired,
  filter: PropTypes.shape().isRequired,
};

export default DirectionFilter;
