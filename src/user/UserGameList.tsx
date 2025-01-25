import { UserEntry } from './user.types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGames } from './useGames';
import { useUser } from './useUser';
import { useMemo } from 'react';
import { useOwnedGames } from './useOwnedGames';
import { OwnedGameInfo } from './games.types';

export function UserGameList({ entries }: { entries: UserEntry[] }) {
  const { allUserIdResults, allUserIds } = useUser({ entries });
  const { userIdToGames, allUserGames } = useOwnedGames({
    userIds: allUserIds,
  });
  const { games } = useGames();

  const gameIdToName = useMemo(() => {
    if (!games.data || games.isLoading || games.isError) {
      return {};
    }
    return games.data.reduce(
      (acc, game) => {
        acc[game.appid] = game.name;
        return acc;
      },
      {} as Record<number, string>,
    );
  }, [games]);

  // const loading = results.some((r) => r.isLoading) || games.isLoading;

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: 'auto', maxWidth: '100%', margin: 'auto' }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Game</TableCell>
            {allUserIds.map((userId) => (
              <TableCell align="right" key={'user' + userId}>
                {userId}
              </TableCell>
            ))}
            <TableCell align="right">Missing Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUserGames.map((appId) => {
            let missingCount = 0;
            return (
              <TableRow
                key={'app' + appId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {gameIdToName[appId] ?? appId}
                </TableCell>
                {allUserIds.map((userId) => {
                  const found = !!userIdToGames[userId]?.games.find(
                    (g: OwnedGameInfo) => g.appid === appId,
                  );
                  if (!found) {
                    missingCount++;
                  }

                  return (
                    <TableCell align="right" key={'userApp' + userId + appId}>
                      {found ? 'Yes' : 'No'}
                    </TableCell>
                  );
                })}
                <TableCell align="right">{missingCount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
