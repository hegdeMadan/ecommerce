export const getStarColor = rating => {
  if (rating > 3) {
    return '#388e3c';
  }
  if (rating > 2) {
    return '#f79900';
  }
  return '#f75b00';
};
