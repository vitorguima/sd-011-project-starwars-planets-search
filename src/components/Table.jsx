import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const Home = () => {
  const { data, request } = useContext(PlanetsContext);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
  });

  React.useEffect(() => { request(); }, [request]);
  if (!data) {
    return null;
  }
  const { results } = data;
  const headerTable = Object.keys(results[0]).filter((key) => key !== 'residents');

  return (
    <div>
      <input
        type="text"
        onChange={ ({ target: { value } }) => setFilter(
          { ...filter, filterByName: { name: value } },
        ) }
      />
      {filter.filterByName.name}
      <table>
        <thead>
          <tr>
            {headerTable.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {results.map((item) => {
            const {
              name,
              rotation_period: rotationPeriod,
              orbital_period: orbitPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,
            } = item;
            return (
              <tr key={ name }>
                <td>{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>{films}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
