// import React from 'react';
// import { Context } from '../hooks/Context';

// function Filters() {
//   const { filters, setFilters } = React.useContext(Context);
//   const [name, setName] = React.useState('');
//   const { data } = React.useContext(Context);
//   const [value, setValue] = React.useState('');
//   const currentData = value
//     ? data.filter((planet) => planet.name.toLowerCase().includes(value)) : data;

//   return (
//     <input
//       type="text"
//       placeholder="Nome do Planeta"
//       onChange={ ({ target }) => setValue(target.value) }
//       data-testid="name-filter"
//     />
//   );
// }

// export default Filters;
