import React, { useContext } from 'react';
import StarWarsContext from './StarWarsContext';

function Table() {
  const { data, setFilters, filters } = useContext(StarWarsContext);

  function getKeys() {
    if (data[0]) {
      const keys = Object.keys(data[0]);
      return (
        keys.map((item, index) => <th key={ index }>{item}</th>)
      );
    }
  }

  const filerByName = data.filter((item) => (
    item.name.toLowerCase().includes(filters.filterByName.name.toLowerCase())));

  const handleInputNameChange = ({ target }) => {
    setFilters(
      { ...filters, filterByName: { name: target.value } },
    );
  };

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        value={ filters.filterByName.name }
        onChange={ handleInputNameChange }
      />
      <table>
        <thead>
          <tr>
            {getKeys()}
          </tr>
        </thead>
        <tbody>
          {
            filerByName.map((item, index) => (
              <tr key={ index }>
                {Object.values(item).map((tdName, index2) => (
                  <td key={ index2 }>{tdName}</td>))}
              </tr>))
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;
