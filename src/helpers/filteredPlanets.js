export default function filteredPlanets(array, object) {
  const { filters: { filterByName: { name } } } = object;
  const filtered = array.filter((planets) => (planets.name).includes(name));
  return filtered;
}
