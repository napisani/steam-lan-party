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
          const response = await fetch(
            `/steam-api/ISteamUser/ResolveVanityURL/v0001/?vanityurl=${entry.username}`,
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const respContent: any = (await response.json())?.response ?? {};

          if (respContent.message === 'No match') {
            return null;
          }
          return respContent.steamid;
        },
        enabled: !!entry.username,
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
          error: null,
        })),
    ];
  }, [results]);

  const allUserIds = allUserIdResults
    .map((r) => r.data)
    .filter(Boolean) as string[];

  const userDetailResults = useQueries(
    allUserIds.map((id) => ({
      queryKey: ['user-details', id],
      queryFn: async () => {
        const response = await fetch(
          `/steam-community-api/actions/ajaxresolveusers?steamids=${id}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const respContent: any[] = (await response.json()) ?? [];

        return respContent[0];
      },
      enabled: !!id,
    })),
  );

  const isLoading =
    allUserIdResults.some((r) => r.isLoading) ||
    userDetailResults.some((r) => r.isLoading);
  const isError =
    allUserIdResults.some((r) => r.isError) ||
    userDetailResults.some((r) => r.isError);
  const error =
    allUserIdResults.find((r) => r.isError)?.error ??
    userDetailResults.find((r) => r.isError)?.error;

  const allUserDetails = userDetailResults.map((r) => r.data);

  return {
    allUserIdResults,
    allUserDetails,
    isLoading,
    isError,
    allUserIds,
    error,
  };
}
