import { createContext } from 'react';

const context = createContext({ data: [], filters: {}, order: {} });

export default context;
