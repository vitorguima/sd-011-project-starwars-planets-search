function qualquerCoisa2({ column, sort }, filteredData, setFilteredData) {
  setFilteredData(filteredData.sort((a, b) => {
    const less1 = -1;
    switch (sort) {
    case 'ASC':
      if (a[column] < b[column]) return less1;
      if (a[column] > b[column]) return 1;
      return 0;
    case 'DESC':
      if (a[column] > b[column]) return less1;
      if (a[column] < b[column]) return 1;
      return 0;
    default:
      return 0;
    }
  }));
}
function qualquerCoisa({ column, sort }, filteredData, setFilteredData) {
  if (
    column === 'name'
    || column === 'climate'
    || column === 'terrain' || column === 'films' || column === 'url'
  ) {
    return qualquerCoisa2({ column, sort }, filteredData, setFilteredData);
  }
}

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
  return qualquerCoisa({ column, sort }, filteredData, setFilteredData);
}
