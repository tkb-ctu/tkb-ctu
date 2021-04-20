import React, { useEffect } from 'react';

import unfocus from '../../utils/unfocus';

import './Navigator.css';

function Navigator({ className, index, maxIndex, onPageChange }) {
  const [page, setPage] = React.useState(index);

  useEffect(() => setPage(index), [index]);

  function handlePagePressEnter(e) {
    if (e.key !== 'Enter') return;

    if (+e.target.value < 0 || +e.target.value > maxIndex) {
      setPage(index);
    } else {
      onPageChange(+e.target.value);
    }
    unfocus();
  }

  function handlePageUnfocus(e) {
    if (+e.target.value < 0 || +e.target.value > maxIndex) {
      setPage(index);
    } else {
      onPageChange(+e.target.value);
    }
  }

  return (
    <div className={`navigator ${className ? className : ''}`}>
      <button
        className={index === 0 ? 'disable' : ''}
        onClick={() => onPageChange(0)}
      >
        đầu
      </button>
      <button
        className={index === 0 ? 'disable' : ''}
        onClick={() => onPageChange(index - 1 < 0 ? 0 : index - 1)}
      >
        trước
      </button>
      <span>
        <input
          className="index"
          type="number"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          onKeyPress={handlePagePressEnter}
          onBlur={handlePageUnfocus}
          style={{ width: ~~(Math.log10(maxIndex) + 1) * 8 }}
        />
        /{maxIndex + 1}
      </span>
      <button
        className={index === maxIndex ? 'disable' : ''}
        onClick={() =>
          onPageChange(index + 1 > maxIndex ? maxIndex : index + 1)
        }
      >
        sau
      </button>
      <button
        className={index === maxIndex ? 'disable' : ''}
        onClick={() => onPageChange(maxIndex)}
      >
        cuối
      </button>
    </div>
  );
}

export default Navigator;
