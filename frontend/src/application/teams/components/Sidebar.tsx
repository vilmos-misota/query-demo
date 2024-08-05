import { useParams } from "@tanstack/react-router";
import { usePlayersStats } from "../../../entities/player/player.query";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  useTeam,
  useTeamRosterStats,
  useTeamsCount,
} from "../../../entities/team/team.query";

import SidebarStats from "./SidebarStats";

export default function Sidebar() {
  const { teamId } = useParams({ strict: false });

  return (
    <aside className="col-span-2 border-r px-3">
      {teamId ? (
        <TeamHeaderBlock teamId={Number(teamId)} />
      ) : (
        <TeamsOverviewBlock />
      )}

      {teamId ? (
        <RosterStatsBlock teamId={Number(teamId)} />
      ) : (
        <PlayersStatsBlock />
      )}
    </aside>
  );
}

const TeamsOverviewBlock = () => {
  const { data: teamCount } = useTeamsCount();

  return (
    <div>
      <h2 className="font-bold mb-3">Overview</h2>
      <p>
        Teams: <span className="font-bold">{teamCount}</span>
      </p>
    </div>
  );
};

const TeamHeaderBlock = ({ teamId }: { teamId: number }) => {
  const { data: team } = useTeam(teamId);

  return (
    <div>
      <h2 className="font-bold mb-3">{team?.name}</h2>
    </div>
  );
};

const RosterStatsBlock = ({ teamId }: { teamId: number }) => {
  const { data: rosterStats, isPending, error } = useTeamRosterStats(teamId);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  return <SidebarStats playerStats={rosterStats} />;
};

const PlayersStatsBlock = () => {
  const { data: playerStats, isPending, error } = usePlayersStats();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  return <SidebarStats playerStats={playerStats} />;
};
