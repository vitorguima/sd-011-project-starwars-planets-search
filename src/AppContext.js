import { createContext } from 'react';

const AppContext = createContext({
  data: undefined,
  filters: {
    filterByName: { name: '' },
    filterByNumericValues: [],
  },
  order: undefined,
});

export default AppContext;
