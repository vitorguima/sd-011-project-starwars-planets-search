import React from 'react';
import { Context } from '../context/GlobalContext';

const Home = () => {
  const { data, request } = React.useContext(Context);
  const [filteredData, setFilteredData] = React.useState([]);
  const [filter, setFilter] = React.useState({
    filterByName: {
      name: '',
    },
  });

  React.useEffect(() => { request(); }, [request]);
  React.useEffect(() => { if (data) setFilteredData(data.results); }, [data]);
  React.useEffect(() => {
    if (data) {
      setFilteredData(data.results.filter((item) => item.name.toLowerCase()
        .includes(filter.filterByName.name.toLowerCase())));
    }
  }, [filter, data]);

  if (!data) {
    return null;
  }

  let headerTable = [];
  if (filteredData.length > 0) {
    headerTable = Object.keys(filteredData[0]).filter((key) => key !== 'residents');
  }
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ ({ target: { value } }) => setFilter(
          { ...filter, filterByName: { name: value } },
        ) }
      />
      <table>
        <thead>
          <tr>
            {headerTable.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => {
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
