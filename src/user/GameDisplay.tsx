import { Link, Stack, Typography } from '@mui/material';
import { useSingleGames } from './useSingleGameInfo';

export function GameDisplay({
  appid,
  displayName,
}: {
  appid: number;
  displayName?: string;
}) {
  const { game, isLoading } = useSingleGames({
    appid: displayName ? undefined : appid,
  });
  return (
    <Stack direction="row">
      <Link
        href={`https://store.steampowered.com/app/${appid}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {displayName ?? game?.name ?? appid}
      </Link>
      {isLoading && <Typography>Loading...</Typography>}
    </Stack>
  );
}
