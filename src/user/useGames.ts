import { useQueries, useQuery } from 'react-query';
import { GameInfo } from './games.types';
import { useMemo } from 'react';

function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size),
  );
}
export function useGames({ appids }: { appids: number[] }) {
  const gameNames = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await fetch(`/steam-api/ISteamApps/GetAppList/v2/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const respContent = (await response.json())?.applist?.apps ?? [];
      return respContent as any[];
    },
  });

  const gamePrices = useQueries(
    chunk(appids, 100).map((batch) => ({
      queryKey: ['games-prices', batch],
      queryFn: async () => {
        const url = `/steam-store-api/appdetails?appids=${batch.join(',')}&filters=price_overview`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const respContent = await response.json();
        return respContent as any[];
      },
      enabled: batch.length > 0,
    })),
  );

  const idToName = useMemo(() => {
    const idToName = gameNames.data?.reduce(
      (acc, game) => {
        acc[game.appid] = game.name;
        return acc;
      },
      {} as Record<number, GameInfo>,
    );
    return idToName;
  }, [gameNames]);

  const gameList = useMemo(() => {
    const gl = gamePrices.flatMap((result) =>
      Object.entries(result.data ?? {}).map(([key, { data }]) => ({
        ...data,
        appid: key,
        name: idToName[key],
      })),
    );
    return gl;
  }, [gamePrices, idToName]);

  return { games: gameList };
}
