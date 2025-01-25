import { useUser } from './useUser';

export function UserDisplay({ userId }: { userId: string }) {
  const { allUserIds, allUserDetails } = useUser({ entries: [{ id: userId }] });
  const firstUserId = allUserIds[0];
  const firstUserDetails = allUserDetails.find(
    (d) => d?.steamid === firstUserId,
  );
  return <>{firstUserDetails?.persona_name ?? userId}</>;
}
