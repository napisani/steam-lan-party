import { useState } from 'react';
import { UserEntry } from './user.types';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

export function UserSearch({
  entries,
  onEntriesChange,
}: {
  entries: UserEntry[];
  onEntriesChange: (entries: UserEntry[]) => void;
}) {
  const [searchType, setSearchType] = useState<'username' | 'id'>('username');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    const newEntry: UserEntry =
      searchType === 'username'
        ? { username: searchValue }
        : { id: searchValue };

    if (JSON.stringify(entries).includes(JSON.stringify(newEntry))) {
      return;
    }

    onEntriesChange([...entries, newEntry]);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search for users
      </Typography>

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Search by:</FormLabel>
        <RadioGroup
          row
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as 'username' | 'id')}
        >
          <FormControlLabel
            value="username"
            control={<Radio />}
            label="Username"
          />
          <FormControlLabel value="id" control={<Radio />} label="ID" />
        </RadioGroup>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label={searchType === 'username' ? 'Username' : 'ID'}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          variant="outlined"
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Box>
  );
}
