import { usePlayersStats } from "../../entities/player/player.query";

export default function PlayersStats() {
  const { data: playerStats, isPending, error } = usePlayersStats();

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
        <span className="font-bold">{playerStats.totalCount}</span>
      </p>
      <p>
        Average age: <span className="font-bold">{playerStats.averageAge}</span>{" "}
      </p>
      <div className="mt-3 border rounded-lg p-3">
        <p className="mb-3">Positions:</p>
        {Object.entries(playerStats.countByPosition).map(
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
