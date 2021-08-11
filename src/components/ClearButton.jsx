import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function ClearButton() {
  const { setNumeric, numeric, setTheRender, data } = useContext(PlanetsContext);

  return (
    <div>
      { numeric.map(({ column, comparison, value }, index) => (
        <div key={ index } data-testid="filter">
          {`${column} ${comparison} ${value}`}
          <button
            type="button"
            onClick={ () => {
              const num = numeric.filter((item) => item.column !== column);
              setNumeric(num);
              if (num.length === 0) setTheRender(data);
            } }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
