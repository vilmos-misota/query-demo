import { z } from "zod";

export const TeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  city: z.string(),
});

export type Team = z.infer<typeof TeamSchema>;
export const TeamsArraySchema = z.array(TeamSchema);
export type Teams = z.infer<typeof TeamsArraySchema>;

export const TeamCreationSchema = TeamSchema.omit({ id: true });
export const TeamUpdateSchema = TeamSchema.omit({ id: true });
