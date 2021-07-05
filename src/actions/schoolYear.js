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

export function changeIsHoaAn(isHoaAn) {
  return {
    type: 'CHANGE_IS_HOA_AN',
    payload: isHoaAn,
  };
}
