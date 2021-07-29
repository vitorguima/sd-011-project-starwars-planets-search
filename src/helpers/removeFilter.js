export default function removeFilter(string, object) {
  const newFilterList = object.filter((numericFilter) => numericFilter.column !== string);
  return newFilterList;
}
