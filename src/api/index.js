function getHost() {
  const isEndOfDyno = new Date().getDate() < 15;

  if (isEndOfDyno) {
    return 'https://htql-2.herokuapp.com';
  } else {
    return 'https://htql-1.herokuapp.com';
  }
}

const groupEndpoint = getHost() + '/groups';
const subjectEndpoint = getHost() + '/subjects';

export async function getGroups(subjectId, year, semester) {
  const query = `?year=${year}&semester=${semester}`;
  const response = await fetch(`${groupEndpoint}/${subjectId}${query}`);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error);
  }

  return json.data;
}

export async function getSubjectName(subjectId) {
  const response = await fetch(subjectEndpoint + '/' + subjectId);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error);
  }

  return json.data;
}

export async function getSubjectNames() {
  const response = await fetch(subjectEndpoint);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error);
  }

  return json.data;
}
