import { usePlayersStats } from "../../entities/player/player.query";
import { useTeamsCount } from "../../entities/team/team.query";

export default function Overview() {
  const { data: teamsCount } = useTeamsCount();
  const { data: playersStat } = usePlayersStats();

  if (typeof teamsCount === "undefined" || typeof playersStat === "undefined") {
    return null;
  }

  return (
    <div className="flex gap-2">
      <div>
        <p>
          Teams: <span className="font-bold">{teamsCount}</span>
        </p>
      </div>
      <div>
        <p>
          Players: <span className="font-bold">{playersStat.totalCount}</span>
        </p>
      </div>
      <div>
        <p>
          Average age:{" "}
          <span className="font-bold">{playersStat.averageAge}</span>
        </p>
      </div>
    </div>
  );
}
