import React from 'react';

import dsmh from '../../../dsmh.json';

import './Schedule.css';

function createScheduleMap(schedule) {
  const map = Array(9)
    .fill(0)
    .map(() => Array(6).fill({ type: 'empty' }));

  for (const subjectId in schedule) {
    schedule[subjectId].buoihoc.forEach((buoi) => {
      map[buoi.tiet[0] - 1][buoi.thu - 2] = {
        type: 'data',
        rowSpan: buoi.tiet.length,
        subjectId: subjectId,
        groupId: schedule[subjectId].kihieu,
        room: buoi.phong,
        member: `${schedule[subjectId].conlai}/${schedule[subjectId].siso}`,
      };

      buoi.tiet.slice(1).forEach((tiet) => {
        map[tiet - 1][buoi.thu - 2] = { type: 'null' };
      });
    });
  }

  return map;
}

function Row({ row, x, colorMap }) {
  return row.map((cell, y) => {
    if (cell.type === 'null') return undefined;
    if (cell.type === 'empty') return <td key={`${x}${y}`}></td>;

    return (
      <td
        key={`${x}${y}`}
        rowSpan={cell.rowSpan}
        style={{ backgroundColor: colorMap[cell.subjectId] }}
        className="schedule__cell-data"
      >
        <p className="subject-id">
          <strong>{`${cell.subjectId} ${cell.groupId}`}</strong>
        </p>
        <p className="subject-name">{dsmh[cell.subjectId]}</p>
        <p>{cell.room}</p>
        <p>{cell.member}</p>
      </td>
    );
  });
}

function Schedule({ schedule, colorMap, index }) {
  const scheduleMap = createScheduleMap(schedule);

  return (
    <div className="schedule">
      <table>
        <thead>
          <tr>
            <th>Tiết</th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
          </tr>
        </thead>
        <tbody>
          {scheduleMap.map((row, x) => (
            <tr key={x}>
              <th>{x + 1}</th>
              <Row row={row} x={x} colorMap={colorMap} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
