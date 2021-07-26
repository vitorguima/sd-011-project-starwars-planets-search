const filterPlanets = ({ column, comparison, value }, alterData) => (
  alterData.filter((planet) => {
    switch (comparison) {
    case 'maior que':
      return parseInt(planet[column], 10) > parseInt(value, 10);
    case 'menor que':
      return parseInt(planet[column], 10) < parseInt(value, 10);
    default:
      return parseInt(planet[column], 10) === parseInt(value, 10);
    }
  })
);

const filterData = (filters, data) => {
  let alterData = data;
  for (let i = 0; i < filters.length; i += 1) {
    alterData = filterPlanets(filters[i], alterData);
  }
  return alterData;
};

export default filterData;
