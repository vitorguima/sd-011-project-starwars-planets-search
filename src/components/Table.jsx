import React from 'react';
import Context from '../Context/Context';

function Table() {
  const resultsApi = React.useContext(Context);
  const [filters, setFilter] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  if (!results.data) {
    return (
      <p>carregando</p>
    );
  }
  const filterApi = Object.keys(results.data.results[0])
    .filter((value) => value !== 'residents');

  return (
    <div>
      olá
    </div>
  );
}

export default Table;
