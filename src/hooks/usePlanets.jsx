import { useContext } from 'react';
import { Context } from '../contexts/PlanetContext';

const usePlanets = () => {
  const planets = useContext(Context);
  return planets;
};

export default usePlanets;
