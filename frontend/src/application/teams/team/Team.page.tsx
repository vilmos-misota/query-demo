import { createRoute, useParams } from "@tanstack/react-router";
import { TeamsRootRoute } from "../Teams.layout";
import { useTeam } from "../../../entities/team/team.query";
import TeamRoster from "./components/TeamRoster";

export const TeamRoute = createRoute({
  path: "$teamId",
  getParentRoute: () => TeamsRootRoute,
  component: TeamPage,
});

function TeamPage() {
  const { teamId } = useParams({ from: "/teams/$teamId" });
  const { data: team, isPending, error } = useTeam(Number(teamId));

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="mb-1 font-bold">Teams / {team?.name}</h1>
        <p className="text-muted-foreground">City: {team.city}</p>
      </div>
      <TeamRoster teamId={teamId} />
    </div>
  );
}
