import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { z } from "zod";
import { Teams, TeamSchema } from "./team.schema";
import { queryKeys } from "../../cache/queryKeys";

import { fetchTeam, fetchTeamRoster, fetchTeams } from "./team.service";
import { countTeams } from "./team.utils";
import { Players } from "../player/player.schema";
import { extractPlayersStats } from "../player/player.utils";

export function useTeams<TData = Teams>(
  options?: Omit<UseQueryOptions<Teams, Error, TData>, "queryKey" | "queryFn">
) {
  return useQuery<Teams, Error, TData>({
    queryKey: queryKeys.teams.all,
    queryFn: fetchTeams,
    ...options,
  });
}

export function useTeam(
  id: number,
  options?: Omit<
    UseQueryOptions<z.infer<typeof TeamSchema>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: queryKeys.teams.detail(id),
    queryFn: () => fetchTeam(id),
    ...options,
  });
}

export function useTeamRoster<TData = Players>(
  teamId: number,
  options?: Omit<UseQueryOptions<Players, Error, TData>, "queryKey" | "queryFn">
) {
  return useQuery<Players, Error, TData>({
    queryKey: queryKeys.teams.roster(teamId),
    queryFn: () => fetchTeamRoster(teamId),
    ...options,
  });
}

export function useTeamRosterStats(teamId: number) {
  return useTeamRoster(teamId, {
    select: (players) => extractPlayersStats(players),
  });
}

export function useTeamsCount() {
  return useTeams({ select: (data) => countTeams(data) });
}
