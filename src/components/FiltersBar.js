import React, { useContext } from 'react';
import MyContext from './context/MyContext';

function FiltersBar() {
  const { attNumber, setFilterNumber } = useContext(MyContext);
  const deleteFilter = ({ target }) => {
    const { name } = target;
    const upDate = attNumber.filter(({ column }) => column !== name);
    console.log(upDate);
    setFilterNumber(upDate);
  };
  return (
    <div>
      { attNumber.map(({ column }, index) => (
        <button
          type="button"
          data-testid="filter"
          name={ column }
          onClick={ deleteFilter }
          key={ index }
        >
          {`${column}🗑`}
        </button>
      ))}
    </div>
  );
}

export default FiltersBar;
