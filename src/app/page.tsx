'use client';

import { UserEntry } from '@/user/user.types';
import { UserGameList } from '@/user/UserGameList';
import { UserIdList } from '@/user/UserIdList';
import { UserSearch } from '@/user/UserSearch';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useUserQueryParams from './useUserQueryParams';
import { useRouter } from 'next/navigation';
const storageKey = 'entries';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
type QueryKeys = {
  username: string[];
  ids: string[];
};
export default function Home() {
  const queryClient = new QueryClient();

  const router = useRouter();
  const [queryValues, setQueryValue] = useUserQueryParams<QueryKeys>(
    ['username', 'ids'],
    { username: [], ids: [] },
    router,
  );

  const entries = useMemo<UserEntry[]>(() => {
    return [
      ...queryValues.username.map((username) => ({
        username,
      })),
      ...queryValues.ids.map((id) => ({
        id,
      })),
    ];
  }, [queryValues]);

  const setEntries = useCallback(
    (newEntries: UserEntry[]) => {
      const newUsernameValues = newEntries
        .filter((entry) => 'username' in entry)
        .map((entry) => entry.username);
      const newIdValues = newEntries
        .filter((entry) => 'id' in entry)
        .map((entry) => entry.id);

      console.log('newUsernameValues', newUsernameValues);
      console.log('newIdValues', newIdValues);
      setQueryValue('username', newUsernameValues);
      setQueryValue('ids', newIdValues);
    },
    [setQueryValue],
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <div>
          <main>
            <UserSearch entries={entries} onEntriesChange={setEntries} />
            <UserIdList entries={entries} onEntriesChange={setEntries} />
            <UserGameList entries={entries} />
          </main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
