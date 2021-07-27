import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

function SeachBar() {
  const { keyWord, getKeyWord } = useContext(PlanetsContext);

  const handleKeyWord = (event) => {
    getKeyWord(event.target.value);
  };

  return (
    <label htmlFor="seach">
      Filtro:
      <input
        text="text"
        value={ keyWord }
        onChange={ handleKeyWord }
        id="seach"
      />
    </label>
  );
}

export default SeachBar;
