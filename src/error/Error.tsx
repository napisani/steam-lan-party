import { Alert, AlertTitle, Box } from '@mui/material';

export function Error({
  error,
  defaultMessage,
}: {
  error: Error | unknown;
  defaultMessage?: string;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Alert severity="error" variant="outlined">
        <AlertTitle>Error</AlertTitle>
        {error instanceof Error
          ? (error as Error).message
          : (defaultMessage ?? 'An unknown error occurred')}
      </Alert>
    </Box>
  );
}
