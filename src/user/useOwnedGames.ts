import { useQueries } from 'react-query';
import { useMemo } from 'react';
import { OwnedGamesInfo } from './games.types';

export function useOwnedGames({ userIds }: { userIds: string[] }) {
  const results = useQueries(
    userIds.map((userId) => ({
      queryKey: ['ownedGames', userId],
      queryFn: async () => {
        const response = await fetch(
          `/steam-api/IPlayerService/GetOwnedGames/v0001/?steamid=${userId}&format=json`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const respContent: any = (await response.json())?.response ?? {};
        return { userId, ...respContent } as OwnedGamesInfo;
      },
    })),
  );

  const userIdToGames = useMemo(() => {
    const pairs = userIds
      .filter(
        (_, i) =>
          !results[i].isLoading && !results[i].isError && results[i].data,
      )
      .map((userId, i) => [userId, results[i].data]);
    return Object.fromEntries(pairs);
  }, [results]);

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  const allUserGames = Array.from(new Set(
    (results.map((r) => r.data).filter(Boolean) as OwnedGamesInfo[])
      .flatMap((g) => g.games ?? [])
      .map((g) => g.appid),
  ));

  return { userIdToGames, isLoading, isError, allUserGames };
}
