export function isGroupRegistrable(group, template) {
  return !group.buoihoc.some((buoi) => {
    return buoi.tiet.some((tiet) => template[tiet - 1][buoi.thu - 2]);
  });
}

export function groupMemberInRange(subjects, minMember = 1, takenGroups = {}) {
  const filteredSubjects = {};
  for (const subjectId in subjects) {
    filteredSubjects[subjectId] = subjects[subjectId].filter(
      (group) =>
        group.conlai >= minMember || takenGroups[subjectId] === group.kihieu,
    );
  }

  return filteredSubjects;
}

export function groupInTemplate(subjects, template, takenGroups = {}) {
  if (!template) return subjects;
  const filteredSubjects = {};

  for (const subjectId in subjects) {
    filteredSubjects[subjectId] = subjects[subjectId].filter((group) => {
      return (
        isGroupRegistrable(group, template) ||
        takenGroups[subjectId] === group.kihieu
      );
    });
  }

  return filteredSubjects;
}

export function hoaAnGroup(subjects) {
  const filteredSubjects = {};
  for (const subjectId in subjects) {
    filteredSubjects[subjectId] = subjects[subjectId].filter((group) =>
      group.buoihoc.every((buoi) => !/HA/.test(buoi.phong)),
    );
  }

  return filteredSubjects;
}

export function khu2Group(subjects) {
  const filteredSubjects = {};
  for (const subjectId in subjects) {
    filteredSubjects[subjectId] = subjects[subjectId].filter(
      (group) => !group.buoihoc.every((buoi) => !/HA/.test(buoi.phong)),
    );
  }

  return filteredSubjects;
}

export function untakenGroup(subjects, takenGroups) {
  const filteredSubjects = { ...subjects };
  // for (const subjectId in subjects) {
  //   filteredSubjects[subjectId] = subjects[subjectId].filter((group) => {
  //     return takenGroups[subjectId].includes(group.kihieu);
  //   });
  // }

  for (const subjectId in takenGroups) {
    if (takenGroups[subjectId]) {
      filteredSubjects[subjectId] = subjects[subjectId].filter((group) => {
        return group.kihieu === takenGroups[subjectId];
      });
    }
  }

  return filteredSubjects;
}
