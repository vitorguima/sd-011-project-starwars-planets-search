import React, { Component } from 'react';
import PlanetsContext from './PlanetsContext';

function Table({ dataForTable }) {
  console.log(dataForTable);
  const columns = dataForTable[0] && Object.keys(dataForTable[0]);
  return (
    <table>
      <thead>
        <tr>
          { dataForTable[0]
          && columns.map((head, index) => {
            if (head === 'residents') return null;
            return <th key={ index }>{ head }</th>;
          })}
        </tr>
      </thead>
      <tbody>
        { dataForTable.map((rolls, index) => (
          <tr key={ index }>
            { columns.map((column) => {
              if (column === 'residents') return null;
              return <td key={ `${index} ${rolls[columns]}` }>{ rolls[column] }</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

// class Table extends Component {
//   render() {
//     return (
//       <PlanetsContext.Consumer>
//         {({ planet }) => (
//           <div>
//             <table>
//               <thead>
//                 <tr>
//                   <th>name</th>
//                   <th>rotation_period</th>
//                   <th>orbital_period</th>
//                   <th>diameter</th>
//                   <th>climate</th>
//                   <th>gravity</th>
//                   <th>terrain</th>
//                   <th>surface_water</th>
//                   <th>population</th>
//                   <th>films</th>
//                   <th>created</th>
//                   <th>edited</th>
//                   <th>url</th>
//                 </tr>
//               </thead>
//             </table>
//           </div>
//         )}
//       </PlanetsContext.Consumer>
//     );
//   }
// }
