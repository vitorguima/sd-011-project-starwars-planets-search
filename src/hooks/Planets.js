import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export default function Planets() {
  const { data, filters, setFilters } = useContext(AppContext);
  const filterName = filters.filterByName.name.trim().toLowerCase();

  let planets;

  if (data.results) {
    planets = data.results.filter(({ name }) => {
      if (filterName) {
        return name.toLowerCase().includes(filterName);
      }
      return true;
    });
  }

  return { planets, filters, setFilters };
}
