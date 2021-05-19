import React, { useState, useEffect } from 'react';

import TagTitle from '../TagTitle';
import ClearIcon from '@material-ui/icons/Clear';

import global from '../../../global';

import './TemplateCard.css';

const tooltip = `Những tiết học được đánh dấu sẽ không được sắp`;

function Row({ row, x, handleCellClick }) {
  return row.map((isActive, y) => (
    <td key={x + '' + y} onClick={() => handleCellClick(x, y)}>
      <ClearIcon className={`tick-icon ${isActive ? 'active' : ''}`} />
    </td>
  ));
}

function TemplateCard() {
  // const template = useSelector((state) => state.template);
  const [isDropdown, setIsDropdown] = useState(false);
  const [template, setTemplate] = useState(
    Array(9)
      .fill(0)
      .map(() => Array(6).fill(false)),
  );

  useEffect(() => {
    global.template = template;
  }, [template]);

  function handleCellClick(x, y) {
    const clone = template.map((arr) => arr.slice(0));
    clone[x][y] = !clone[x][y];

    setTemplate(clone);
  }

  function handleTietClick(x) {
    const clone = template.map((arr) => arr.slice(0));

    if (clone[x].some((isActive) => !isActive)) {
      clone[x] = clone[x].fill(true);
    } else {
      clone[x] = clone[x].fill(false);
    }

    setTemplate(clone);
  }

  function handleThuClick(y) {
    const clone = template.map((arr) => arr.slice(0));
    const isContainActive = clone.some((row) => !row[y]);

    clone.forEach((row) => {
      row[y] = isContainActive;
    });

    setTemplate(clone);
  }

  return (
    <div
      className={`sidebar__card template-card ${isDropdown ? '' : 'pulled'}`}
    >
      <TagTitle
        title="Lọc tiết học"
        tooltip={tooltip}
        isDropdown={isDropdown}
        onDropdownIconClick={() => setIsDropdown(!isDropdown)}
      />
      <table style={{ clear: 'both' }}>
        <tbody>
          <tr>
            <th>Tiết</th>
            <th onClick={() => handleThuClick(0)}>Thứ 2</th>
            <th onClick={() => handleThuClick(1)}>Thứ 3</th>
            <th onClick={() => handleThuClick(2)}>Thứ 4</th>
            <th onClick={() => handleThuClick(3)}>Thứ 5</th>
            <th onClick={() => handleThuClick(4)}>Thứ 6</th>
            <th onClick={() => handleThuClick(5)}>Thứ 7</th>
          </tr>
          {template.map((row, x) => (
            <tr key={x}>
              <th onClick={() => handleTietClick(x)}>{x + 1}</th>
              <Row row={row} x={x} handleCellClick={handleCellClick} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TemplateCard;
