'use client';

import { UserEntry } from '@/user/user.types';
import { UserGameList } from '@/user/UserGameList';
import { UserIdList } from '@/user/UserIdList';
import { UserSearch } from '@/user/UserSearch';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Home() {
  const queryClient = new QueryClient();
  const [entries, setEntries] = useState<UserEntry[]>([]);

  useEffect(() => {
    setEntries(() => {
      const savedEntries = window.localStorage.getItem('entries');
      return savedEntries ? JSON.parse(savedEntries) : [];
    });
  },[]);

  useEffect(() => {
    window.localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <main>
          <UserSearch entries={entries} onEntriesChange={setEntries} />
          <UserIdList entries={entries} onEntriesChange={setEntries} />
          <UserGameList entries={entries} />
        </main>
      </div>
    </QueryClientProvider>
  );
}
