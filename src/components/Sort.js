const falseReturn = -1;
export const sortByName = (a, b, order) => {
  const { column, sort } = order;
  if (sort === 'ASC') {
    if (a[column] < b[column]) {
      return falseReturn;
    }
    if (a[column] > b[column]) {
      return 1;
    }
  }
  if (sort === 'DESC') {
    if (a[column] > b[column]) {
      return falseReturn;
    }
    if (a[column] < b[column]) {
      return 1;
    }
  }
};

export const sortByValues = (a, b, order) => {
  const { column, sort } = order;
  if (sort === 'ASC') {
    if (parseFloat(a[column]) < parseFloat(b[column])) {
      return falseReturn;
    }
    if (parseFloat(a[column]) > parseFloat(b[column])) {
      return 1;
    }
  }

  if (sort === 'DESC') {
    if (parseFloat(a[column]) > parseFloat(b[column])) {
      return falseReturn;
    }
    if (parseFloat(a[column]) < parseFloat(b[column])) {
      return 1;
    }
  }
};
