import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { z } from "zod";
import { Players, PlayerSchema } from "./player.schema";
import { queryKeys } from "../../cache/queryKeys";
import { extractPlayersStats } from "./player.utils";
import { fetchPlayer, fetchPlayers } from "./player.service";

export function usePlayers<TData = Players>(
  options?: Omit<UseQueryOptions<Players, Error, TData>, "queryKey" | "queryFn">
) {
  return useQuery<Players, Error, TData>({
    queryKey: queryKeys.players.all,
    queryFn: fetchPlayers,
    ...options,
  });
}

export function usePlayer(
  id: number,
  options?: Omit<
    UseQueryOptions<z.infer<typeof PlayerSchema>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: queryKeys.players.detail(id),
    queryFn: () => fetchPlayer(id),
    ...options,
  });
}

export function usePlayersStats() {
  return usePlayers({ select: (data) => extractPlayersStats(data) });
}
