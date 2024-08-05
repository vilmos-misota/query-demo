import { PlayerStats } from "../../../entities/player/player.schema";

export default function SidebarStats({
  playerStats,
}: {
  playerStats: PlayerStats;
}) {
  return (
    <div>
      <p>
        Number of player:{" "}
        <span className="font-bold">{playerStats.totalCount}</span>
      </p>
      <p>
        Average age: <span className="font-bold">{playerStats.averageAge}</span>{" "}
      </p>
      <div className="mt-3">
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
