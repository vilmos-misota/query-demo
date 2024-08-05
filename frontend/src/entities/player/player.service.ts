import {
  Player,
  PlayerSchema,
  Players,
  PlayersArraySchema,
} from "./player.schema";
import { URL } from "../../server/url";

export async function fetchPlayers(): Promise<Players> {
  const response = await fetch(`${URL}/players`);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return PlayersArraySchema.parse(data);
}

export async function fetchPlayer(id: number): Promise<Player> {
  const response = await fetch(`${URL}/players/${id}`);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return PlayerSchema.parse(data);
}

export async function editPlayer(
  playerId: number,
  updatedPlayer: Partial<Player>
): Promise<Player> {
  const response = await fetch(`${URL}/players/${playerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPlayer),
  });
  if (!response.ok) {
    throw new Error("Failed to edit player");
  }
  return response.json();
}

export async function deletePlayer(id: number): Promise<void> {
  const response = await fetch(`${URL}/players/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete player");
  }
}

export async function addPlayer(newPlayer: Partial<Player>): Promise<Player> {
  const response = await fetch(`${URL}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlayer),
  });
  if (!response.ok) {
    throw new Error("Failed to add player");
  }
  return response.json();
}
