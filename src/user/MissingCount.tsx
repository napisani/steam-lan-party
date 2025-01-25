import { Chip } from '@mui/material';
import { getColor, getContrastingColor } from './color.utils';

export function MissingCount({
  missingCount,
  totalUsers,
}: {
  missingCount: number;
  totalUsers: number;
}) {
  const color = getColor({ value: missingCount, total: totalUsers });
  const contrastingColor = getContrastingColor(color);

  return (
    <Chip
      label={missingCount}
      sx={{
        backgroundColor: color,
        color: contrastingColor,
        fontWeight: 'bold',
        borderRadius: '10%',
      }}
      aria-label="missingCount"
    />
  );
}
