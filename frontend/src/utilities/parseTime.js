export const parseTime = (time) => {
  const [hours, minutes, seconds] = time.split(":");
  return [Number(hours), Number(minutes), Number(seconds)];
};
