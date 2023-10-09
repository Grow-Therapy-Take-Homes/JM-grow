export const step = (times, step, start = 0) => {
  //create a function that takes a number and creates an array with increments
  return Array.from({ length: times }, (_, i) => (i + 1) * step + start);
};
