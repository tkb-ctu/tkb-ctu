import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ClearIcon from '@material-ui/icons/Clear';

import * as filter from '../../utils/filter';
import * as api from '../../api';
import global from '../../global';
import dsmh from '../../dsmh.json';

import './SubjectTag.css';

function SubjectTag({ subjectId, handleDeleteSubject }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [subjectName, setSubjectName] = useState(dsmh[subjectId] || '...');
  const [isFounded, setIsFounded] = useState(true);

  const schoolYear = useSelector((state) => state.schoolYear);

  const isUnmounted = useRef(false);

  useEffect(() => {
    async function fetchSubjectName() {
      try {
        const response = await api.getSubjectName(subjectId);

        dsmh[subjectId] = response;
        setSubjectName(response);

        // handle error
      } catch (err) {
        setSubjectName('Không xác định');
      }
    }

    if (subjectName === '...') fetchSubjectName();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    isUnmounted.current = false;

    return () => {
      isUnmounted.current = true;
      delete global.subjects[subjectId];
      delete global.takenGroups[subjectId];
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.getGroups(
          subjectId,
          schoolYear.year,
          schoolYear.semester,
        );

        if (isUnmounted.current) return;
        const data = filter.hoaAnGroup(response)[subjectId];

        global.subjects[subjectId] = data;

        setGroups(['Tất cả', ...data.map((group) => group.kihieu).sort()]);
        setSelectedGroup('Tất cả');
        setIsFounded(true);
      } catch (err) {
        setGroups(['Not Found']);
        setIsFounded(false);
      }
    }

    setGroups(['Loading']);
    fetchData();
    // eslint-disable-next-line
  }, [schoolYear]);

  useEffect(() => {
    if (
      selectedGroup === 'Loading' ||
      selectedGroup === 'Not Found' ||
      selectedGroup === ''
    )
      return;

    if (selectedGroup === 'Tất cả') {
      delete global.takenGroups[subjectId];
    } else {
      global.takenGroups[subjectId] = selectedGroup;
    }
    // eslint-disable-next-line
  }, [selectedGroup]);

  const info = `${subjectId} - ${subjectName}`;

  return (
    <div className="subject-tag">
      <div className="subject-tag__info">
        {isFounded ? <span>{info}</span> : <strike>{info}</strike>}
      </div>
      <ClearIcon
        className="subject-tag__clear-icon"
        onClick={() => handleDeleteSubject(subjectId)}
      />
      <select
        className="subject-tag__groups"
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
      >
        {groups.map((group) => (
          <option key={group}>{group}</option>
        ))}
      </select>
    </div>
  );
}

export default SubjectTag;
