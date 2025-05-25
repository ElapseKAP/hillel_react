function sortList(list, criterion) {
  if ( ! Array.isArray(list) || ! list.length) {
    return list;
  }

  if ( criterion === '' ) {
    return list;
  }

  const numberedFields = ['rating', 'cookTimeMinutes', 'caloriesPerServing'];
  let sortedList = [...list];
  sortedList.sort( (a, b) => {
    const valueA = a[criterion];
    const valueB = b[criterion];

    if (numberedFields.includes(criterion)) {
      return valueA - valueB;
    } else {
      return String(valueA).localeCompare(String(valueB));
    }
  });


  return sortedList;
}

export {sortList};
