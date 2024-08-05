import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../Root.layout";

export const PlayersRoute = createRoute({
  path: "/players",
  getParentRoute: () => rootRoute,
  component: PlayersPage,
});

function PlayersPage() {
  return (
    <div>
      <h1>Players</h1>
      {/* <PlayersList /> */}
    </div>
  );
}
