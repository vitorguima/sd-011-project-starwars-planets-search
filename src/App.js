import React from 'react';

import StarWarsProvider from './Context/StarWarsProvider';
import Home from './Pages/Home';

function App() {
  return (
    <StarWarsProvider>
      <Home />
    </StarWarsProvider>
  );
}

export default App;