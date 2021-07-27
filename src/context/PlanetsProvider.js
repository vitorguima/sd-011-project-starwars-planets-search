import { useEffect, useState } from 'react';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    console.log('ola');
  }, []);

  const contextValue = {
    planets,
  };

  return (
    <Provider value={ contextValue }>
      { children }
    </Provider>
  );
}
