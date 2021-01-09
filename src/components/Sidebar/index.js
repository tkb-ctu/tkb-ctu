import React from 'react';

import SubjectCard from './SubjectCard';
import SchoolYearSelector from './SchoolYearSelector';
import TemplateCard from './TemplateCard';
import MemberCard from './MemberCard';
import AreaCard from './AreaCard';

import './Sidebar.css';

function Sidebar({ onCreateButtonClick }) {
  const [isCalculating, setIsCalculating] = React.useState(false);

  function handleCreateButtonClick() {
    setIsCalculating(true);
    // make sure sidebar rerendered before run cpu intensive task
    setImmediate(() => {
      onCreateButtonClick();
      setIsCalculating(false);
    });
  }
  return (
    <div className="sidebar">
      <SchoolYearSelector />
      <SubjectCard />
      <TemplateCard />
      <MemberCard />
      <AreaCard />
      <button
        className="sidebar__generate-btn"
        onClick={handleCreateButtonClick}
      >
        Tạo thời khóa biểu{isCalculating ? '...' : ''}
      </button>
    </div>
  );
}

export default Sidebar;
