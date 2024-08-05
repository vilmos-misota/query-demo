# query-demo

This is a basic demo team/player management app built to showcase how TanStack's React Query is used. Additional tools used in this project include:

- Tanstack Router - for routing
- Zod: For schema validation
- React Hook Form: To handle forms
- Tailwind CSS (via the `shadCn`): For the UI

The app uses a provider pattern where the local state is separated from the server state. 
**Data fetching is done on demand**, hence the multiple query keys for invalidation.

**For something similar to what we have in our app**, we could just fetch and cache the data on app level, and look up the cache each time it's needed.

So the query would look like this:

```
export const useTeamsData = () => {
  return useQuery({
    queryKey: queryKeys.teams.all,
    queryFn: fetchTeams,
    staleTime: Infinity,
    select: (teams) => new Map(teams.map(t => [t.id, t])),
  });
};

```

It would then be called during app initialization:

```
function App() {
  const { isLoading: isLoadingPlayers } = usePlayersData();
  const { isLoading: isLoadingTeams } = useTeamsData();

  if (isLoadingPlayers || isLoadingTeams) {
    return <div>Loading...</div>;
  }

  return <MainContent />;
}

```

Wherever we need the teams data, we would just use this hook:

```
export const useTeam = (teamId: number) => {
  const queryClient = useQueryClient();
  const teamsMap = queryClient.getQueryData<Map<number, Team>>(['teams']);
  return teamsMap?.get(teamId);
};
```

On each mutation, this key needs to be invalidated: queryKeys.teams.all, which would then sync all the components using the teams data.

Please note that the routes for players and team actions haven't been added. You are welcome to do so and play around with it.

**Best place to explore is probably the entities/players folder where all the players logic is colocated**

## Installation

First, ensure you're using the correct Node.js version:

```bash
  nvm use v21.6.2
```

This project is split into two folders: one for the Node.js backend and one for the React/Vite frontend.

### Backend

The backend is located in the server folder. It runs a mockup with additional 2 teams and few players. To start the backend server, navigate to the server folder and run:

```bash
    node server.js
```

### Frontend

The frontend is located in the frontend folder. To start the frontend development server, navigate to the frontend folder and run:

```bash
    npm run dev
```
