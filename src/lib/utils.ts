export function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function clsx(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
