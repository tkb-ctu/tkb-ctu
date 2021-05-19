import React, { useState, useEffect } from 'react';

import Schedule from './Schedule';
import Navigator from './Navigator';

import global from '../../global';

import './Result.css';

const colorPalette = [
  '#ACDDDE',
  '#CBE4F9',
  '#CDF5F6',
  '#D7D8BF',
  '#E3E3F2',
  '#EFF9DA',
  '#F7D8BA',
  '#F9D8D6',
  '#F9EBDF',
  '#FFD3FD',
  '#FFFDDB',
];

function createColorMap(subjectIds) {
  const colors = [...colorPalette];
  const colorMap = {};

  subjectIds.forEach((subjectId) => {
    colorMap[subjectId] = colors.splice(0, 1)?.[0];
  });

  return colorMap;
}

const limit = 10;

function Result({ schedules }, ref) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => setCurrentIndex(0), [schedules]);

  if (!ref) throw new Error('must have ref property');
  if (schedules === null) return <div className="result"></div>;

  const maxIndex = Math.ceil(schedules.length / limit) - 1;
  const colorMap = createColorMap(Object.keys(global.subjects));
  const isDesktop = window.innerWidth > 700;
  const startIndex = currentIndex * limit;

  function onPageChange2(index) {
    setCurrentIndex(index);

    if (isDesktop) {
      ref.current.scroll(0, 0);
    } else {
      window.scroll(0, ref.current.offsetTop);
    }
  }

  const message =
    schedules.length !== 0
      ? `${schedules.length} thời khóa biểu được tìm thấy`
      : 'Không tìm thấy thời khóa biểu phù hợp';

  return (
    <div className="result" ref={ref}>
      {/* {(isDesktop && currentIndex === 0) || !isDesktop ? ( */}
      <h2>{message}</h2>
      {/* ) : null} */}

      {/* {schedules.length > limit ? ( */}
      {/*   (isDesktop && currentIndex !== 0) || !isDesktop ? ( */}
      {/*     <Navigator */}
      {/*       index={currentIndex} */}
      {/*       maxIndex={maxIndex} */}
      {/*       onPageChange={onPageChange1} */}
      {/*       className={'result__top-navigator'} */}
      {/*     /> */}
      {/*   ) : null */}
      {/* ) : null} */}

      <div className="schedules">
        {schedules.slice(startIndex, startIndex + limit).map((schedule, i) => (
          <>
            <p style={{ fontWeight: 'bold', textAlign: 'center', margin: 0 }}>
              {startIndex + i + 1}
            </p>
            <Schedule
              key={i}
              schedule={schedule}
              colorMap={colorMap}
              index={startIndex + i + 1}
            />
          </>
        ))}
      </div>

      {schedules.length > limit ? (
        <Navigator
          index={currentIndex}
          maxIndex={maxIndex}
          onPageChange={onPageChange2}
          className={'result__bottom-navigator'}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.forwardRef(Result);
