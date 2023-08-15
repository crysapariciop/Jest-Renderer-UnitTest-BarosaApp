const SOCKET_BASE_URL = `https://barosa-api.nixet.io`;

export const boxAndPaperArray = [
  { name: 'Box & Papers', id: 0 },
  { name: 'Box only', id: 1 },
  { name: 'Papers only', id: 2 },
  { name: 'watch only', id: 3 },
];

export const conditionArray = [
  { name: 'Unworn', id: 0 },
  { name: 'Preowned', id: 1 },
  { name: 'Need Repair', id: 2 },
];

export const defaultImages = {
  profilePic:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwvzSjkssPQTEv9fbHMYBeieEJvzak_VAGHIEaEVloIW2rjCQ8US3R5LxHcm9eB3xr2To&usqp=CAU',
  noImage: 'https://www.carsaludable.com.ar/wp-content/uploads/2014/03/default-placeholder.png',
};

export default { SOCKET_BASE_URL };
