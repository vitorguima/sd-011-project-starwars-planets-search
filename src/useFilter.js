export default function useFilter(data, name) {
  if (name.length > 0) {
    const planetFilter = data.filter((planet) => (
      planet.name.toLowerCase().includes(name.toLowerCase())));
    return { planetFilter };
  }
  const planetFilter = data;
  return { planetFilter };
}
