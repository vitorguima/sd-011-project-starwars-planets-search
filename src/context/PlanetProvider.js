import React, { useState } from 'react';
import PlanetContext from './PlanetContext';

// eslint-disable-next-line react/prop-types
function PlanetProvider({ children }) {
  const [planet, setPlanet] = useState([]);

  const addPlanet = (newPlanet) => {
    setPlanet(planet.concat(newPlanet));
  };

  return (
    <main>
      <PlanetContext.Provider value={ { planet, addPlanet } }>
        {children}
      </PlanetContext.Provider>
    </main>
  );
}

export default PlanetProvider;
