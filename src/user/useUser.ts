import { useQueries } from 'react-query';
import { UserEntry } from './user.types';
import { useMemo } from 'react';

export function useUser({ entries }: { entries: UserEntry[] }) {
  const results = useQueries(
    entries
      .filter((e) => {
        return 'username' in e;
      })
      .map((entry) => ({
        queryKey: ['userid', entry.username],
        queryFn: async () => {
          console.log(
            'fetching user',
            `/steam-api/ISteamUser/ResolveVanityURL/v0001/?vanityurl=${entry.username}`,
          );
          const response = await fetch(
            `/steam-api/ISteamUser/ResolveVanityURL/v0001/?vanityurl=${entry.username}`,
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const respContent: any = (await response.json())?.response ?? {};
          console.log('response', respContent);

          if (respContent.message === 'No match') {
            return null;
          }
          return respContent.steamid;
        },
      })),
  );

  const allUserIdResults = useMemo(() => {
    return [
      ...results,
      ...entries
        .filter((e) => 'id' in e)
        .map((e) => ({
          data: e.id,
          isLoading: false,
          isError: false,
        })),
    ];
  }, [results]);

  const isLoading = allUserIdResults.some((r) => r.isLoading);
  const isError = allUserIdResults.some((r) => r.isError);

  const allUserIds = allUserIdResults
    .map((r) => r.data)
    .filter(Boolean) as string[];

  return { allUserIdResults, isLoading, isError, allUserIds };
}
