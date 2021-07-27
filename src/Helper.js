const Helper = (filterByNumericValues, filterData) => {
  const filterColumn = filterData.filter((value) => {
    if (filterByNumericValues.length > 0) {
      const filterValues = filterByNumericValues[filterByNumericValues.length - 1];
      switch (filterValues.comparison) {
      case 'maior que':
        return value[filterValues.column] > Number(filterValues.value);
      case 'menor que':
        return value[filterValues.column] < Number(filterValues.value);
      case 'igual a':
        return value[filterValues.column] === filterValues.value;
      default:
        return true;
      }
    } return true;
  });
  return filterColumn;
};

export default Helper;
