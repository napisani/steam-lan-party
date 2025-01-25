import { useQuery } from 'react-query';
import { GameInfo } from './games.types';

export function useGames() {
  const games = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await fetch(`/steam-api/ISteamApps/GetAppList/v2/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const respContent = (await response.json())?.applist?.apps ?? [];
      return respContent as GameInfo[];
    },
  });

  return { games };
}
