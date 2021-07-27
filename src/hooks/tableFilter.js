import { useContext } from 'react';
import Context from '../context/Context';

function useTableFilter() {
  /* const [filter, setFilter] = useState({ filterByName: { name: '' } }); */
  const { filters, setFilters } = useContext(Context);
  console.log(filters);
  console.log(setFilters);

  const handleInputChange = (newFilter) => {
    setFilter({ filterByName: { name: newFilter } });
  };

  /* return { handleInputChange, filter }; */
  return { handleInputChange };
}

export default useTableFilter;
