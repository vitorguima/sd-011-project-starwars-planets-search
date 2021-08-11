export default function sortNumbers({ column, sort }, filteredData, setFilteredData) {
  if (
    column !== 'name'
    || column !== 'climate'
    || column !== 'terrain' || column !== 'films' || column !== 'url'
  ) {
    setFilteredData(filteredData.sort((a, b) => {
      switch (sort) {
      case 'ASC':
        return parseInt(a[column], 10) - parseInt(b[column], 10);
      case 'DESC':
        return parseInt(b[column], 10) - parseInt(a[column], 10);
      default:
        return 0;
      }
    }));
  }
  if (
    column === 'name'
    || column === 'climate'
    || column === 'terrain' || column === 'films' || column === 'url'
  ) {
    setFilteredData(filteredData.sort((a, b) => {
      switch (sort) {
      case 'ASC':
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      case 'DESC':
        if (a[column] > b[column]) return -1;
        if (a[column] < b[column]) return 1;
        return 0;
      default:
        return 0;
      }
    }));
  }
}
