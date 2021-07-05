const global = {
  subjects: {},
  takenGroups: {},
  template: Array(9)
    .fill(0)
    .map(() => Array(6).fill(false)),
  minMember: 1,
};

export default global;
