function stringSort(array, column, type) {
  const data = array.map((item) => item);
  const keep = -1;
  if (type === 'ASC') {
    data.sort((a, b) => {
      const nameA = a[column].toUpperCase();
      const nameB = b[column].toUpperCase();
      if (nameA === nameB) return 0;
      return nameA < nameB ? keep : 1;
    });
  } else {
    data.sort((a, b) => {
      const nameA = a[column].toUpperCase();
      const nameB = b[column].toUpperCase();
      if (nameA === nameB) return 0;
      return nameA > nameB ? keep : 1;
    });
  }
  return data;
}

const ascending = (data, column) => {
  const array = data.map((item) => item);
  const keep = -1;
  array.sort((a, b) => {
    if (a[column] === 'unknown') return keep;
    if (b[column] === 'unknown') return 1;
    const numberA = parseInt(a[column].match(/^\d+/g), 10);
    const numberB = parseInt(b[column].match(/^\d+/g), 10);
    if (numberA === numberB) return 0;
    return numberA < numberB ? keep : 1;
  });
  return array;
};

const descending = (data, column) => {
  const array = data.map((item) => item);
  const keep = -1;
  array.sort((a, b) => {
    if (a[column] === 'unknown') return 1;
    if (b[column] === 'unknown') return keep;
    const numberA = parseInt(a[column].match(/^\d+/), 10);
    const numberB = parseInt(b[column].match(/^\d+/), 10);
    if (numberA === numberB) return 0;
    return numberA > numberB ? keep : 1;
  });
  return array;
};

function numberSort(array, column, type) {
  const data = array.map((item) => item);
  if (type === 'ASC') {
    return ascending(data, column);
  }
  return descending(data, column);
}

export default function mySort(items, { column, sort }) {
  if (column === '') return items;
  switch (column) {
  case 'name' || 'climate' || 'terrain' || 'url':
    return stringSort(items, column, sort);
  default:
    return numberSort(items, column, sort);
  }
}
