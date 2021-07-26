import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import TableRow from './TableRow';

export default function Table() {
  const { planets, loading } = useContext(PlanetsContext);
  // const [data, setData] = useState({
  //   name: [],
  // });

  // useEffect(() => {
  //   setData(planets.map((planet) => ({
  //     name: planet.name,
  //   })));
  // }, [planets]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const tableHead = Object.keys(planets[0]).filter((key) => key !== 'residents');

  return (
    <table>
      <thead>
        <tr>
          { tableHead.map((key, index) => <th key={ index }>{key}</th>) }
        </tr>
      </thead>
      <tbody>
        { planets.map((planet, index) => <TableRow key={ index } planet={ planet } />) }
      </tbody>
    </table>
  );
}
