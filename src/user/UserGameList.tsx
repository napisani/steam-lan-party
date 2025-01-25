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
import { useMemo, useState } from 'react';
import { useOwnedGames } from './useOwnedGames';
import { GameInfo, OwnedGameInfo } from './games.types';
import { Error } from '@/error/Error';
import { Typography } from '@mui/material';
import { UserDisplay } from './UserDisplay';
import { MissingCount } from './MissingCount';
import { Price } from './Price';
import { PRICE_NOT_FOUND } from './price.utils';

export function UserGameList({ entries }: { entries: UserEntry[] }) {
  const {
    allUserIds,
    isLoading: isLoadingUser,
    isError: isUserError,
    error: userError,
  } = useUser({ entries });
  const { userIdToGames, allUserGames } = useOwnedGames({
    userIds: allUserIds,
  });
  const [sortField, setSortField] = useState<
    'missingCount' | 'unitPrice' | 'totalPrice'
  >('missingCount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { games } = useGames({ appids: allUserGames });
  const gameIdToName = useMemo(() => {
    if (!games) {
      return {};
    }
    return games.reduce(
      (acc, game) => {
        acc[game.appid] = game;
        return acc;
      },
      {} as Record<number, GameInfo>,
    );
  }, [games]);

  const rows = useMemo(() => {
    const unsortedRows = allUserGames.map((appId) => {
      const missingCount = allUserIds.reduce((acc, userId) => {
        const found = !!userIdToGames[userId]?.games?.find(
          (g: OwnedGameInfo) => g.appid === appId,
        );
        return acc + (found ? 0 : 1);
      }, 0);
      const userIdToGameFound = Object.fromEntries(
        allUserIds.map((userId) => {
          const found = !!userIdToGames[userId]?.games?.find(
            (g: OwnedGameInfo) => g.appid === appId,
          );
          return [userId, found];
        }),
      );

      const priceOverview = gameIdToName[appId]?.price_overview ?? {};
      const unitPrice = priceOverview.final ?? PRICE_NOT_FOUND;
      const totalPrice =
        unitPrice === PRICE_NOT_FOUND
          ? PRICE_NOT_FOUND
          : unitPrice * missingCount;
      if (unitPrice === -1) {
        console.log('unitPrice', priceOverview);
      }

      return { appId, userIdToGameFound, missingCount, unitPrice, totalPrice };
    });

    return unsortedRows.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortField] - b[sortField];
      } else {
        return b[sortField] - a[sortField];
      }
    });
  }, [userIdToGames, allUserIds, allUserGames, sortField, sortOrder]);

  const maxTotalPrice = Math.max(...rows.map((r) => r.totalPrice));

  const handleSortChange = (
    field: 'missingCount' | 'unitPrice' | 'totalPrice',
  ) => {
    if (field === sortField) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const isLoading = isLoadingUser;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const isError = isUserError;
  if (isError) {
    return <Error error={userError} defaultMessage="An error occurred" />;
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: 'auto', maxWidth: '100%', margin: 'auto' }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontStyle="bold" fontWeight="bold">
                Game
              </Typography>
            </TableCell>
            {allUserIds.map((userId) => (
              <TableCell align="right" key={'user' + userId}>
                <Typography fontStyle="bold" fontWeight="bold">
                  <UserDisplay userId={userId} />
                </Typography>
              </TableCell>
            ))}
            <TableCell
              align="right"
              onClick={() => handleSortChange('missingCount')}
              style={{ cursor: 'pointer' }}
            >
              <Typography fontStyle="bold" fontWeight="bold">
                Missing Count{' '}
                {sortField === 'missingCount'
                  ? sortOrder === 'asc'
                    ? '▲'
                    : '▼'
                  : ''}
              </Typography>
            </TableCell>
            <TableCell
              align="right"
              onClick={() => handleSortChange('unitPrice')}
              style={{ cursor: 'pointer' }}
            >
              <Typography fontStyle="bold" fontWeight="bold">
                Unit Price{' '}
                {sortField === 'unitPrice'
                  ? sortOrder === 'asc'
                    ? '▲'
                    : '▼'
                  : ''}
              </Typography>
            </TableCell>
            <TableCell
              align="right"
              onClick={() => handleSortChange('totalPrice')}
              style={{ cursor: 'pointer' }}
            >
              <Typography fontStyle="bold" fontWeight="bold">
                Total Price{' '}
                {sortField === 'totalPrice'
                  ? sortOrder === 'asc'
                    ? '▲'
                    : '▼'
                  : ''}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(
            ({
              appId,
              userIdToGameFound,
              missingCount,
              unitPrice,
              totalPrice,
            }) => {
              return (
                <TableRow
                  key={'app' + appId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {gameIdToName[appId]?.name ?? appId}
                  </TableCell>
                  {allUserIds.map((userId) => {
                    const found = userIdToGameFound[userId];
                    return (
                      <TableCell align="right" key={'userApp' + userId + appId}>
                        {found ? 'Yes' : 'No'}
                      </TableCell>
                    );
                  })}
                  <TableCell align="right">
                    <MissingCount
                      missingCount={missingCount}
                      totalUsers={allUserIds.length}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {unitPrice === PRICE_NOT_FOUND
                      ? 'N/A'
                      : `$${(unitPrice / 100).toFixed(2)}`}
                  </TableCell>
                  <TableCell align="right">
                    <Price price={totalPrice} highestPrice={maxTotalPrice} />
                  </TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
