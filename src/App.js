import React from 'react';

import Sidebar from './components/Sidebar';
import Result from './components/Result';

import global from './global';
import createSchedules from './utils/createSchedules';
import * as filter from './utils/filter';

import './App.css';

function App() {
  const [schedules, setSchedules] = React.useState(null);
  const resultRef = React.useRef(null);

  function onCreateButtonClick() {
    let { subjects, takenGroups, template, minMember } = global;

    subjects = filter.untakenGroup(subjects, takenGroups);
    subjects = filter.groupMemberInRange(subjects, minMember, takenGroups);
    subjects = filter.groupInTemplate(subjects, template, takenGroups);

    const schedules = createSchedules(subjects);

    setSchedules(schedules);

    if (window.innerWidth > 700) {
      resultRef.current.scroll(0, 0);
    }
  }

  return (
    <div className="app">
      <Sidebar onCreateButtonClick={onCreateButtonClick} />
      <Result schedules={schedules} ref={resultRef} />
    </div>
  );
}

export default App;
