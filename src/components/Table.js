import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default function Table() {
  const { isLoading, userSelection, handleChange } = useContext(TableContext);
  const { name } = userSelection.filters.filterByName;

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <form action="">
        <label htmlFor="planet">
          Planet:
          <input
            onChange={ (e) => handleChange(e) }
            data-testid="name-filter"
            value={ name }
            placeholder="Planet name..."
            type="text"
            id="planet"
          />
        </label>
      </form>
      <table>
        <TableHeader />
        <TableBody />
      </table>
    </div>
  );
}
