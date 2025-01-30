'use client';

import { UserEntry } from '@/user/user.types';
import { UserGameList } from '@/user/UserGameList';
import { UserIdList } from '@/user/UserIdList';
import { UserSearch } from '@/user/UserSearch';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
const storageKey = 'entries';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
export default function Home() {
  const queryClient = new QueryClient();
  const [entries, setEntries] = useState<UserEntry[]>(() => {
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEntries = window.localStorage.getItem(storageKey);
      setEntries(savedEntries ? JSON.parse(savedEntries) : []);
    }
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      window.localStorage.setItem(storageKey, JSON.stringify(entries));
    }
  }, [entries]);
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
