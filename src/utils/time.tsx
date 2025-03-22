export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
};

export const DEFAULT_TIMES = {
  work: 25 * 60, // 25 min
  pause: 5 * 60, // 5 min
  break: 15 * 60, // 15 min
};
