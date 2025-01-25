import { UserEntry } from './user.types';
import { useUser } from './useUser';

import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

export function UserIdList({
  entries,
  onEntriesChange,
}: {
  entries: UserEntry[];
  onEntriesChange: (entries: UserEntry[]) => void;
}) {
  const { allUserIdResults: results } = useUser({ entries });
  const handleRemove = (index: number) => {
    onEntriesChange(entries.filter((_, i) => i !== index));
  };
  return (
    <Stack gap={2} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      {results.map((result, idx) => {
        let cmp = null;
        if (result.isLoading) {
          cmp = <Typography key={idx}>Loading...</Typography>;
        } else if (result.isError) {
          cmp = (
            <Typography key={idx} color="error">
              Error: {JSON.stringify((result as { error: any }).error)}
            </Typography>
          );
        } else {
          cmp = <Typography key={idx}>User ID: {result.data}</Typography>;
        }
        return (
          <Stack
            alignItems="center"
            justifyContent="center"
            key={idx}
            direction="row"
            spacing={2}
            sx={{ width: '100%' }}
          >
            <Box flexGrow={1}>{cmp}</Box>
            <Button
              color="error"
              variant="contained"
              onClick={() => handleRemove(idx)}
            >
              X
            </Button>
          </Stack>
        );
      })}
    </Stack>
  );
}
