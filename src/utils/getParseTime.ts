export const getParsedTime = (timer: number) => {
  if (timer <= 0) return "00:00";

  const minutes = Math.floor(timer / 60);
  const seconds = (timer % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};
