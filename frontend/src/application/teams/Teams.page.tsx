import { createRoute } from "@tanstack/react-router";
import { TeamsRootRoute } from "./Teams.layout";
import TeamLists from "../../components/blocks/TeamLists";

export const TeamsRoute = createRoute({
  path: "/",
  getParentRoute: () => TeamsRootRoute,
  component: TeamsPage,
});

function TeamsPage() {
  return (
    <div>
      <h1 className="mb-5 font-bold">Teams</h1>
      <TeamLists />
    </div>
  );
}
