import React from 'react';
import Table from './components/Table';
import Provider from './context/Provider'

const App = () => (
  <div>
    <Provider>
      <Table />
    </Provider>
  </div>

);

export default App;
