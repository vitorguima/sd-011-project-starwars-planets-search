import React, { useContext } from 'react';
import GlobalContext from '../Context/GlobalContext';

export default function FilterByName() {
  const { filters: { filterByName: { setFilterName } } } = useContext(GlobalContext);

  return (
    <div>
      <b>Pesquisar: </b>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (e) => setFilterName(e.target.value) }
      />
    </div>
  );
}
