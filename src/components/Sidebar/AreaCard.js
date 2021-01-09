import React, { useState, useEffect } from 'react';

import TagTitle from './TagTitle';

import './AreaCard.css';

const tooltip = `Những nhà học được chọn sẽ không được sắp`;

function SubjectCard() {
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <div className={`sidebar__card area-card ${isDropdown ? '' : 'pulled'}`}>
      <TagTitle
        title="Lọc nhà học"
        tooltip={tooltip}
        isDropdown={isDropdown}
        onDropdownIconClick={() => setIsDropdown(!isDropdown)}
      />

      <div style={{ textAlign: 'center' }}>
        <span>C1: nha hoc C1</span>
        <input type="checkbox" name="" />
        <br />
        <span>C1: nha hoc C1</span>
        <input type="checkbox" name="" />
        <br />
        <span>C1: nha hoc C1</span>
        <input type="checkbox" name="" />
      </div>
    </div>
  );
}

export default SubjectCard;
