import { Chip } from '@mui/material';
import { PRICE_NOT_FOUND } from './price.utils';
import { getColor, getContrastingColor } from './color.utils';

export function Price({
  price,
  highestPrice,
}: {
  price: number;
  highestPrice: number;
}) {
  const color = getColor({ value: price, total: highestPrice });
  const contrastingColor = getContrastingColor(color);
  return (
    <Chip
      label={price === PRICE_NOT_FOUND ? 'N/A' : `$${(price / 100).toFixed(2)}`}
      sx={{
        backgroundColor: price === PRICE_NOT_FOUND ? undefined : color,
        color: price === PRICE_NOT_FOUND ? undefined : contrastingColor,
        fontWeight: 'bold',
        borderRadius: '10%',
      }}
      aria-label="price"
    />
  );
}
