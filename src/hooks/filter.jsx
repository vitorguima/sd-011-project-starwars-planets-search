import { useContext, useEffect, useState } from 'react';
import MyContext from '../Context/MyContext';

function InputFilter() {
  const { data, filters } = useContext(MyContext);
  const { name } = filters.filterByName;
  const [newData, setNewData] = useState(data);

  useEffect(() => {
    if (name) {
      setNewData(data.filter((planet) => planet.name
        .toUpperCase().includes(name.toUpperCase())));
    } else {
      setNewData(data);
    }
  }, [data, name]);

  return newData;
}

export default InputFilter;
