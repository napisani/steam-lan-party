import { useQueries } from 'react-query';

export function useGames({ appids }: { appids: number[] }) {
  // const games = useQuery({
  //   queryKey: ['games'],
  //   queryFn: async () => {
  //     const response = await fetch(`/steam-api/ISteamApps/GetAppList/v2/`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const respContent = (await response.json())?.applist?.apps ?? [];
  //     return respContent as GameInfo[];
  //   },
  // });
  //store.steampowered.com/api/appdetails?appids=
  const gameQueries = useQueries(
    appids.map((appid) => ({
      queryKey: ['game', appid],
      queryFn: async () => {
        const url = `/steam-store-api/appdetails?appids=${appid}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const respContent: Record<string, any> = (await response.json()) ?? {};

        if (respContent[appid]?.success) {
          return { ...respContent[appid].data, appid };
        }
        return null;
      },
    })),
  );

  const games = gameQueries.map((query) => query.data).filter(Boolean);

  return { games };
}
