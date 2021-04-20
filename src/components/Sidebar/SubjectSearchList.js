import React from 'react';

import dsmh from '../../dsmh.json';

import './SubjectSearchList.css';

function SubjectDropdown(props) {
  const { subjects, selectedIndex, onOptionClick, onMouseOverOption } = props;

  return (
    <div className="subject-search-list">
      {subjects.map((subjectid, i) => (
        <div
          key={subjectid}
          className={`subject-search-list__option ${
            i === selectedIndex ? 'active' : ''
          }`}
          onMouseOver={() => onMouseOverOption(i)}
          onMouseDown={() => onOptionClick(i)}
        >
          {`${subjectid} - ${dsmh[subjectid]}`}
        </div>
      ))}
    </div>
  );
}

export default SubjectDropdown;
