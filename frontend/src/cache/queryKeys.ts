export const queryKeys = {
  teams: {
    all: ["teams"] as const,
    detail: (id: number) => [...queryKeys.teams.all, id] as const,
    roster: (id: number) => [...queryKeys.teams.all, id, "roster"] as const,
    mutations: {
      create: () => [...queryKeys.teams.all, "create"] as const,
      update: () => [...queryKeys.teams.all, "update"] as const,
      delete: () => [...queryKeys.teams.all, "delete"] as const,
    },
  },
  players: {
    all: ["players"] as const,
    detail: (id: number) => [...queryKeys.players.all, id] as const,
    mutations: {
      create: () => [...queryKeys.players.all, "create"] as const,
      update: () => [...queryKeys.players.all, "update"] as const,
      delete: () => [...queryKeys.players.all, "delete"] as const,
    },
  },
};
