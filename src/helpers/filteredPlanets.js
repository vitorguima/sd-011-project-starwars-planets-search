export function filteredPlanets(array, object) {
  const numericFilters = object.map((plan) => {
    switch (plan.comparison) {
    case 'maior que':
      return array
        .filter((newArray) => Number(newArray[plan.column]) > Number(plan.value));
    case 'menor que':
      return array
        .filter((newArray) => Number(newArray[plan.column]) < Number(plan.value));
    case 'igual a':
      return array
        .filter((newArray) => Number(newArray[plan.column]) === Number(plan.value));
    default:
      return array;
    }
  });
  //   if (plan.comparison === 'maior que') {
  //     return array
  //       .filter((newArray) => Number(newArray[plan.column]) > Number(plan.value));
  //   } return array;
  return numericFilters;
}

export function filteredPlanetsByName(array, object) {
  const { filterByName: { name } } = object;
  const filtered = array.filter((planets) => (planets.name).includes(name));
  return filtered;
}
