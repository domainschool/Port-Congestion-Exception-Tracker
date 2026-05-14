export const getStagnantDuration = (arrivalTimestamp: string): { hours: number; minutes: number; isCritical: boolean } => {
  const arrival = new Date(arrivalTimestamp);
  const now = new Date();
  const diffMs = now.getTime() - arrival.getTime();
  
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return {
    hours,
    minutes,
    isCritical: hours >= 24,
  };
};

export const formatDuration = (hours: number, minutes: number): string => {
  return `${hours}h ${minutes}m`;
};
