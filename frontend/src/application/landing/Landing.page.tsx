import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../Root.layout";

import TeamLists from "../../components/blocks/TeamLists";

export const LandingRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: LandingPage,
});

function LandingPage() {
  return (
    <div>
      <h1 className="my-10 text-3xl font-bold">Overview</h1>

      <TeamLists />
    </div>
  );
}
