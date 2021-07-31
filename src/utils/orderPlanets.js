const dataInNumber = [
  'rotation_period',
  'orbital_period',
  'diameter',
  'surface_water',
  'population',
];

const orderPlanets = (list, filters) => {
  const { column, sort } = filters.order;
  if (dataInNumber.includes(column)) {
    return sort === 'ASC'
      ? list.sort((a, b) => a[column] - b[column])
      : list.sort((b, a) => a[column] - b[column]);
  }
  if (sort === 'DESC') return list.sort((b, a) => a[column].localeCompare(b[column]));
  return list.sort((a, b) => a[column].localeCompare(b[column]));
};

export default orderPlanets;
