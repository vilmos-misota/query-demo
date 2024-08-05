import { URL } from "../../server/url";
import { Players } from "../player/player.schema";
import { Team, TeamSchema, Teams, TeamsArraySchema } from "./team.schema";

export async function fetchTeams(): Promise<Teams> {
  const response = await fetch(`${URL}/teams`);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return TeamsArraySchema.parse(data);
}

export async function fetchTeam(teamId: number): Promise<Team> {
  const response = await fetch(`${URL}/teams/${teamId}`);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return TeamSchema.parse(data);
}

export async function fetchTeamRoster(teamId: number): Promise<Players> {
  const response = await fetch(`${URL}/teams/${teamId}/roster`);
  if (!response.ok) throw new Error("Failed to fetch team roster");
  return response.json();
}
