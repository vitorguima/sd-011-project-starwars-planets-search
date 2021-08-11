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
        <span data-testid="filter" key={ index }>
          <button
            type="button"
            name={ column }
            onClick={ deleteFilter }
          >
            {`${column}🗑`}
          </button>
        </span>
      ))}
    </div>
  );
}

export default FiltersBar;

// {/* <button
//           type="button"
//           data-testid="filter"
//           name={ column }
//           onClick={ deleteFilter }
//           key={ index }
//         ></button> */}
