import { useQuery } from 'react-query';

export function useSingleGames({ appid }: { appid: number | undefined }) {
  const gameDetails = useQuery({
    queryKey: ['single-game', appid],
    queryFn: async () => {
      const url = `/steam-store-api/appdetails?appids=${appid}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const respContent = await response.json();
      return respContent as any;
    },
    // enabled: !!appid,
    // TODO disabled for now to avoid hitting the API limit
    enabled: false,
    staleTime: Infinity,
  });

  return {
    game: appid ? gameDetails.data?.[appid]?.data : undefined,
    isLoading: gameDetails.isLoading,
  };
}
