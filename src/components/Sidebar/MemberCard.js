import React, { useState, useEffect } from 'react';

import TagTitle from './TagTitle';

import unfocus from '../../utils/unfocus';
import global from '../../global';

import './MemberCard.css';

const tooltip = `Những nhóm có sỉ số ít hơn được chỉ định sẽ không được sắp`;

function TemplateCard() {
  const [isDropdown, setIsDropdown] = useState(false);
  const [member, setMember] = useState(0);

  useEffect(() => {
    global.minMember = +member;
  }, [member]);

  return (
    <div className={`sidebar__card member-card ${isDropdown ? '' : 'pulled'}`}>
      <TagTitle
        title="Lọc sĩ số"
        tooltip={tooltip}
        isDropdown={isDropdown}
        onDropdownIconClick={() => setIsDropdown(!isDropdown)}
      />

      <div className="range">
        <input
          type="number"
          value={member}
          onChange={(e) => setMember(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? unfocus() : null)}
        />
        <input
          value={member}
          onChange={(e) => setMember(e.target.value)}
          type="range"
          min="1"
          max="50"
        />
      </div>
    </div>
  );
}

export default TemplateCard;
