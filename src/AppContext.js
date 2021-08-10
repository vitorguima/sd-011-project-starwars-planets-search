import { createContext } from 'react';

const AppContext = createContext({
  data: undefined,
  filters: {
    filterByName: { name: '' },
  },
});

export default AppContext;
