// const [planetFilter, setplanetFilter] = React.useState({
//   filterByName: {
//     name: '',
//   },
//   filterByNumericValues: [
//   ],
// });

export default function handleFilters(array, filters) {
  const { filterByName, filterByNumericValues } = filters;
  let result = array
    .filter((content) => content !== 'residents')
    .filter((planet) => planet.name.includes(filterByName.name));

  if (filterByNumericValues.length !== 0) {
    result = result.filter((planet) => {
      let planetCondition = true;

      filterByNumericValues.forEach((condition) => {
        const { column, comparison, value } = condition;
        switch (comparison) {
        case 'maior que':
          planetCondition = Number(planet[column]) > Number(value) && planetCondition;
          break;
        case 'menor que':
          planetCondition = Number(planet[column]) < Number(value) && planetCondition;
          break;
        case 'igual a':
          planetCondition = Number(planet[column]) === Number(value) && planetCondition;
          break;
        default:
          planetCondition = false;
        }
      });
      return planetCondition;
    });
  }

  return result;
}
