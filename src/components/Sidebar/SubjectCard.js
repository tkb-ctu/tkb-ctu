import React, { useState, useEffect } from 'react';

import SubjectTag from './SubjectTag';
import TagTitle from './TagTitle';
import SubjectDropdown from './SubjectDropdown';

import viToEn from '../../utils/viToEn';

import dsmh from '../../dsmh.json';

import './SubjectCard.css';

const search = {};
const tooltip = `Chọn lại "Tất cả" để chỉ định nhóm cụ thể, hệ thống sẽ sắp thời khóa biểu xoay quanh nhóm đó`;

Object.keys(dsmh).forEach((key) => {
  search[key] = viToEn(dsmh[key])
    .replace(/[^a-zA-Z0-9 ]+/g, '')
    .replace(/\s+/, ' ');
});

function isSubjectExist(target, subjects) {
  return subjects.some((subjectId) => subjectId === target.toUpperCase());
}

function getSavedSubjects() {
  const subjects = window.localStorage.getItem('subjects');
  if (!subjects) return [];

  return subjects.split(',');
}

function SubjectCard() {
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [querySubjects, setQuerySubjects] = useState([]);
  const [subjects, setSubjects] = useState(getSavedSubjects());

  useEffect(() => {
    window.localStorage.setItem('subjects', subjects.join(','));
  }, [subjects]);

  useEffect(() => {
    if (input === '') {
      setQuerySubjects([]);
      return;
    }

    setSelectedIndex(-1);

    setQuerySubjects(
      Object.keys(dsmh)
        .filter(
          (key) =>
            key.includes(input.toUpperCase()) ||
            search[key].includes(viToEn(input)),
        )
        .slice(0, 30),
    );
  }, [input]);

  function handleAddSubject(e) {
    e.preventDefault();
    if (input === '') return;
    if (isSubjectExist(input, subjects)) return;

    setSubjects([...subjects, input.toUpperCase()]);
    setInput('');
  }

  function handleDeleteSubject(target) {
    setSubjects(subjects.filter((subjectId) => subjectId !== target));
  }

  function onOptionClick(index) {
    if (isSubjectExist(querySubjects[index], subjects)) {
      return;
    }

    setInput('');
    setSubjects([...subjects, querySubjects[index]]);
  }

  function onMouseOverOption(index) {
    setSelectedIndex(index);
  }

  function handleInputKeydown(e) {
    if (
      (e.key === 'ArrowDown' || e.key === 'Tab') &&
      selectedIndex < querySubjects.length - 1
    ) {
      setSelectedIndex(selectedIndex + 1);
      e.preventDefault();
    }
    if (e.key === 'ArrowUp' && selectedIndex > -1) {
      setSelectedIndex(selectedIndex - 1);
      e.preventDefault();
    }
    if (e.key === 'Enter' && selectedIndex !== -1) {
      if (isSubjectExist(querySubjects[selectedIndex], subjects)) return;

      setInput('');
      setSubjects([...subjects, querySubjects[selectedIndex]]);
      e.preventDefault();
    }
  }

  return (
    <div className="sidebar__card subject-card">
      <TagTitle
        title="Chọn học phần"
        containDropdown={false}
        tooltip={tooltip}
      />

      <form onSubmit={handleAddSubject} className="subject-card__input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeydown}
          placeholder="Mã học phần"
          type="text"
        ></input>
        <input type="submit" value="Thêm"></input>

        <SubjectDropdown
          subjects={querySubjects}
          selectedIndex={selectedIndex}
          onOptionClick={onOptionClick}
          onMouseOverOption={onMouseOverOption}
        />
      </form>

      <div>
        {subjects.map((subjectId, i) => (
          <SubjectTag
            key={subjectId}
            subjectId={subjectId.toUpperCase()}
            handleDeleteSubject={handleDeleteSubject}
          />
        ))}
      </div>
    </div>
  );
}

export default SubjectCard;
