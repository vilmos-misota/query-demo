import { Player } from "./player.schema";

export const extractPlayersStats = (players: Player[]) => {
  const totalCount = players.length;
  const averageAge =
    totalCount > 0
      ? Number(
          (
            players.reduce((sum, player) => sum + player.age, 0) / totalCount
          ).toFixed(2)
        )
      : 0;

  const countByPosition = players.reduce((acc, player) => {
    acc[player.position] = (acc[player.position] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalCount,
    averageAge,
    countByPosition,
  };
};
