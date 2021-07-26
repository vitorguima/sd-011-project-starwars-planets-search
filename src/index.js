import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppProvider from './ContextAPI_Configs/AppProvider';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root'),
);
