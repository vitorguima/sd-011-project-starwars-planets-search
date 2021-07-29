import { useState } from 'react';
import FetchPlanets from '../services';

export default function usePlanets() {
  const [planets, setPlanets] = useState([]);
  setPlanets(FetchPlanets().results);
  return planets;
}
