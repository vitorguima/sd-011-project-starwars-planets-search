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

  return (
    <div>
      olá
    </div>
  );
}

export default Table;
