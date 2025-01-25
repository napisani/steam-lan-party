import { Stack, Typography } from '@mui/material';
import { useOwnedGames } from './useOwnedGames';
import { useUser } from './useUser';

export function UserDisplay({ userId }: { userId: string }) {
  const { allUserIds, allUserDetails } = useUser({ entries: [{ id: userId }] });
  const firstUserId = allUserIds[0];
  const firstUserDetails = allUserDetails.find(
    (d) => d?.steamid === firstUserId,
  );
  const { userIdToGames } = useOwnedGames({ userIds: [firstUserId] });
  const firstUserGames = userIdToGames[firstUserId];
  const isPrivate = !!firstUserGames && !('games' in firstUserGames);
  return (
    <>
      {firstUserDetails?.persona_name ?? userId} {/* {isPrivate && ( */}
      {/*   <Typography aria-label="private" color="error"> */}
      {/*     (P) */}
      {/*   </Typography> */}
      {/* )} */}
    </>
  );
}
