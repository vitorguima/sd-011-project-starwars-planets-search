import React, { useState, useEffect } from 'react';
import TableContext from '../context/TableContext';

export default function TableProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const info = await response.json();
        console.log(info);
        setData(data.concat(info.results));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [data]);

  // const storeData = (newData) => {
  //   setData(data.concat(newData));
  // };

  return (
    <TableContext.Provider value={ { data } }>
      { children }
    </TableContext.Provider>
  );
}
