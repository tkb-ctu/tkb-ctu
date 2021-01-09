export function changeYear(year) {
  return {
    type: 'CHANGE_YEAR',
    payload: year,
  };
}

export function changeSemester(semester) {
  return {
    type: 'CHANGE_SEMESTER',
    payload: semester,
  };
}
