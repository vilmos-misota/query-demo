import { useTeams } from "../../entities/team/team.query";
import TeamOverviewCard from "../cards/TeamOverviewCard";
import { Skeletons } from "../ui/skeleton";

export default function TeamLists() {
  const { data: teams, isPending, error } = useTeams();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {isPending ? (
        <Skeletons count={3} height={350} />
      ) : (
        teams.map((team) => <TeamOverviewCard key={team.id} team={team} />)
      )}
    </div>
  );
}
