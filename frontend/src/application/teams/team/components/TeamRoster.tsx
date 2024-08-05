import PlayerLists from "../../../../components/blocks/PlayerLists";
import AddPlayerToCurrentTeamButton from "../../../../components/buttons/AddPlayerButton";
import { Skeleton } from "../../../../components/ui/skeleton";
import { useTeamRoster } from "../../../../entities/team/team.query";

export default function TeamRoster({ teamId }: { teamId: string }) {
  const { data: roster, isPending, error } = useTeamRoster(Number(teamId));

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <Skeleton className="w-full h-[500px]" />;
  }

  return (
    <div className="bg-secondary rounded-lg p-5">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-center font-bold mb-5">Roster</h3>
        <AddPlayerToCurrentTeamButton teamId={teamId} />
      </div>

      <PlayerLists players={roster} />
    </div>
  );
}
