import React from 'react';
// import MyContext from './MyContext';
import PropTypes from 'prop-types';

function Filter({ initstate, setInitState }) {
  function changeValue({ target }) {
    const { value } = target;
    const { data } = initstate;
    setInitState({
      ...initstate,
      newData: data.filter(({ name }) => name.includes(value)),
      filterByName: {
        name: value,
      },
    });
  }

  return (
    <form>
      <input
        type="text"
        onChange={ changeValue }
        data-testid="name-filter"
      />
    </form>
  );
}

export default Filter;

Filter.propTypes = {
  initstate: PropTypes.shape().isRequired,
  setInitState: PropTypes.func.isRequired,
};
