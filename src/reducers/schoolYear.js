function generateInitialState() {
  const now = new Date();

  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  let semester, year;

  if (currentMonth <= 4 || currentMonth >= 11) {
    semester = 2;
  } else if (currentMonth <= 6) {
    semester = 3;
  } else {
    semester = 1;
  }

  if (currentMonth >= 7) year = currentYear + 1;
  else year = currentYear;

  return {
    year: year.toString(),
    semester: semester.toString(),
    isHoaAn: false,
  };
}

export default function schoolYear(state = generateInitialState(), action) {
  switch (action.type) {
    case 'CHANGE_YEAR':
      return {
        ...state,
        year: action.payload,
      };

    case 'CHANGE_SEMESTER':
      return {
        ...state,
        semester: action.payload,
      };

    case 'CHANGE_IS_HOA_AN':
      return {
        ...state,
        isHoaAn: action.payload,
      };

    default:
      return state;
  }
}
