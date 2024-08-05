import { useTeamRosterStats } from "../../entities/team/team.query";

export default function RosterStats({ teamId }: { teamId: number }) {
  const { data: playersStats, isPending, error } = useTeamRosterStats(teamId);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <p>
        Number of player:{" "}
        <span className="font-bold">{playersStats.totalCount}</span>
      </p>
      <p>
        Average age:{" "}
        <span className="font-bold">{playersStats.averageAge}</span>{" "}
      </p>
      <div className="mt-3 border rounded-lg p-3">
        <p className="mb-3">Positions:</p>
        {Object.entries(playersStats.countByPosition).map(
          ([position, count]) => (
            <p key={position}>
              {position}: <span className="font-bold">{count}</span>
            </p>
          )
        )}
      </div>
    </div>
  );
}
