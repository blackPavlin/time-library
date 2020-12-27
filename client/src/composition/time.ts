/* eslint-disable */
export function useTime() {
  const getHoursAndMinutes = (minutes: number): string => {
    const hours = Math.trunc(minutes / 60);
    const min = minutes % 60;
    return `${hours} Hours ${min} Minutes`;
  };

  return {
    getHoursAndMinutes,
  };
}
