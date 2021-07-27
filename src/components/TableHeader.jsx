import React from 'react';

function TableHeader() {
  const tableTitles = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'Url',
  ];
  return (
    <tr>
      {tableTitles.map((title) => (
        <th key={ title }>
          { title }
          <hr />
        </th>))}
    </tr>
  );
}

export default TableHeader;
