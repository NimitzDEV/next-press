const bgColorList = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#039be5',
  '#0097a7',
  '#009688',
  '#43a047',
  '#689f38',
  '#ff5722',
  '#757575',
  '#607d8b',
];

export const getRandomColor = () => {
  return bgColorList[Math.floor(Math.random() * (bgColorList.length - 1) + 1)];
};
