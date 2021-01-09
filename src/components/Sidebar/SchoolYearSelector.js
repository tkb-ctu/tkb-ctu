import React from 'react';
import { useSelector } from 'react-redux';

import store from '../../store';
import { changeYear, changeSemester } from '../../actions/schoolYear';

import './SchoolYearSelector.css';

function SemesterSelection() {
  const year = useSelector((state) => state.schoolYear.year);
  const semester = useSelector((state) => state.schoolYear.semester);

  return (
    <div className="semester-selection">
      <span>Năm học: </span>
      <select
        value={year}
        onChange={(e) => store.dispatch(changeYear(e.target.value))}
      >
        <option value="2019">2018-2019</option>
        <option value="2020">2019-2020</option>
        <option value="2021">2020-2021</option>
        <option value="2022">2021-2022</option>
        <option value="2023">2022-2023</option>
        <option value="2024">2023-2024</option>
        <option value="2025">2024-2025</option>
        <option value="2026">2025-2026</option>
      </select>

      <span>Học kỳ: </span>
      <select
        value={semester}
        onChange={(e) => store.dispatch(changeSemester(e.target.value))}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
  );
}

export default SemesterSelection;
