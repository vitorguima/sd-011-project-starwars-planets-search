import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import planetListContext from './planetListContext';

function App() {
  const [data, setData] = useState([]);

  return (
    <div>
      <planetListContext.Provider value={ { data, setData } }>
        <Table />
        {/* <button onClick={ lala(setData) } />
        <button onClick={ () => fetchPlanetsAPI().then((r) => { setData(r); }) } /> */}
      </planetListContext.Provider>
    </div>
  );
}

export default App;
