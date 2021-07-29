import React from 'react';
import ReactDOM from 'react-dom';
import PlanetsProvider from './providers/PlanetsProvider';
// import { PlanetsContext } from './contexts/PlanetsContext.js';

import App from './App';

ReactDOM.render
(
      <App />,
  document.getElementById('root'),
);


// ReactDOM.render
// (
//   <PlanetsProvider>
//       <App />
//   </PlanetsProvider>,
//   document.getElementById('root'),
// );