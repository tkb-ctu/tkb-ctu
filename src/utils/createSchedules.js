import shuffle from 'shuffle-array';
import * as filter from './filter';

function findAllSchedule(subjects, template) {
  const [subjectId] = Object.keys(subjects);
  if (!subjectId) return [{}];

  const result = [];

  for (const group of subjects[subjectId]) {
    if (!filter.isGroupRegistrable(group, template)) continue;

    const templateClone = template.map((row) => row.slice(0));

    // Fill buoihoc to template clone
    group.buoihoc.forEach((buoi) => {
      buoi.tiet.forEach(
        (tiet) => (templateClone[tiet - 1][buoi.thu - 2] = true),
      );
    });

    // Filter conflict group and remove current subjectId in subjects clone
    const filteredSubjects = filter.groupInTemplate(subjects, templateClone);
    delete filteredSubjects[subjectId];

    // Recur to get child schedules
    const childSchedules = findAllSchedule(filteredSubjects, templateClone);

    // Loop through all child schedule and append current subject to it
    childSchedules.forEach((childSchedule) => {
      result.push({ [subjectId]: group, ...childSchedule });
    });
    // for (const childSchedule of childSchedules) {
    //   result.push({ [key]: subject, ...childSchedule });
    //   if (result.length >= 10e3) return result;
    // }

    // strict numbers of result
    if (result.length > 1e5) return result;
  }

  return result;
}

export default function createSchedules(subjects) {
  if (Object.keys(subjects).length === 0) return [];

  // for (const subjectId in subjects) {
  //   subjects[subjectId].sort((a, b) => {
  //     return Math.abs(a.siso - 25 - a.conlai) < Math.abs(b.siso - 25 - b.conlai)
  //       ? -1
  //       : 1;
  //   });
  // }

  const shuffledSubjects = shuffle(Object.keys(subjects)).reduce((acc, cur) => {
    acc[cur] = shuffle(subjects[cur]);
    return acc;
  }, {});

  console.time('calculate');
  const allSchedules = findAllSchedule(
    shuffledSubjects,
    Array(9)
      .fill(0)
      .map(() => Array(6).fill(false)),
  );
  console.timeEnd('calculate');

  // return allSchedules;
  return shuffle(allSchedules);
}
