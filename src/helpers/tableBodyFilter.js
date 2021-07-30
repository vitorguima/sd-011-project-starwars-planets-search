function tableBodyFilter({ data, filters, keysFilter }) {
  const {
    filterByName: { name },
    filterByNumericValues: [{ column, comparison, value }],
  } = filters;

  return (data.filter((planet) => {
    if (comparison === 'maior que') {
      return (Number((planet[column]) > Number(value)) && planet.name.includes(name));
    } if (comparison === 'menor que') {
      return (Number((planet[column]) < Number(value)) && planet.name.includes(name));
    } if (comparison === 'igual a') {
      return ((Number(planet[column]) === Number(value)) && planet.name.includes(name));
    }
    return (planet.name.includes(name));
  }).map((planet) => {
    keysFilter.forEach((filter) => delete planet[filter]);
    return Object.values(planet);
  }));
}

export default tableBodyFilter;
