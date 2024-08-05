import { z } from "zod";

export const PlayerSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "Name is required" }),
  position: z.enum(["Forward", "Midfielder", "Defender", "Goalkeeper"]),
  age: z
    .number()
    .int()
    .min(18, { message: "minimum age 18" })
    .max(40, { message: "maximum age 40" }),
  teamId: z.number(),
});

export type Player = z.infer<typeof PlayerSchema>;

export const PlayersArraySchema = z.array(PlayerSchema);
export type Players = z.infer<typeof PlayersArraySchema>;

export const PlayerCreationSchema = PlayerSchema.omit({ id: true });
export const PlayerUpdateSchema = PlayerSchema.omit({ id: true });

export const PlayerStatsSchema = z.object({
  totalCount: z.number(),
  averageAge: z.number(),
  countByPosition: z.record(z.number()),
});

export type PlayerStats = z.infer<typeof PlayerStatsSchema>;
