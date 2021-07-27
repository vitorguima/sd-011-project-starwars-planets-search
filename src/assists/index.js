export const columnOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

export const comparisonOptions = ['maior que', 'menor que', 'igual a'];

export const INITIAL_NUM_FILTER = {
  column: 'population',
  comparison: 'maior que',
  value: 0 };

export function filterComparisonNumber(filter, rest) {
  let comparisonValue = true;
  filter.filterByNumericValues.forEach((fil) => {
    const { column, comparison, value } = fil;
    const valuePlanet = rest[column];
    if (valuePlanet === 'unknown') comparisonValue = false;
    switch (comparison) {
    case 'igual a':
      comparisonValue = comparisonValue && Number(valuePlanet) === Number(value);
      break;
    case 'maior que':
      comparisonValue = comparisonValue && Number(valuePlanet) > Number(value);
      break;
    case 'menor que':
      comparisonValue = comparisonValue && Number(valuePlanet) < Number(value);
      break;
    default:
      comparisonValue = false;
      break;
    }
  });
  return comparisonValue;
}
