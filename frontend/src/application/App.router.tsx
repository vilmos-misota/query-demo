import { RouterProvider, createRouter } from "@tanstack/react-router";
import { rootRoute } from "./Root.layout";
import { LandingRoute } from "./landing/Landing.page";

import { PlayersRoute } from "./players/Players.page";
import { TeamsRootRoute } from "./teams/Teams.layout";
import { TeamsRoute } from "./teams/Teams.page";
import { TeamRoute } from "./teams/team/Team.page";

const routeTree = rootRoute.addChildren([
  LandingRoute,
  TeamsRootRoute.addChildren([TeamsRoute, TeamRoute]),
  PlayersRoute,
]);

const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
