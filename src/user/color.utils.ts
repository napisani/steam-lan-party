export function getColor({
  value,
  total,
  successColor = '#4caf50',
  errorColor = '#f44336',
}: {
  successColor?: string;
  errorColor?: string;
  value: number;
  total: number;
}) {
  const ratio = value / total;

  const r = Math.round(
    parseInt(successColor.slice(1, 3), 16) * (1 - ratio) +
      parseInt(errorColor.slice(1, 3), 16) * ratio,
  );
  const g = Math.round(
    parseInt(successColor.slice(3, 5), 16) * (1 - ratio) +
      parseInt(errorColor.slice(3, 5), 16) * ratio,
  );
  const b = Math.round(
    parseInt(successColor.slice(5, 7), 16) * (1 - ratio) +
      parseInt(errorColor.slice(5, 7), 16) * ratio,
  );

  return `rgb(${r}, ${g}, ${b})`;
}

export function getContrastingColor(rgbColor: string): string {
  const rgb = rgbColor.match(/\d+/g);
  if (!rgb || rgb.length !== 3) {
    throw new Error('Invalid RGB color format');
  }

  const [r, g, b] = rgb.map(Number);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? 'black' : 'white';
}
