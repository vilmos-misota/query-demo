import { Outlet, createRoute } from "@tanstack/react-router";
import { rootRoute } from "../Root.layout";
import Sidebar from "./components/Sidebar";

export const TeamsRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "teams",
  component: TeamsLayout,
});

export default function TeamsLayout() {
  return (
    <div className="w-full grid grid-cols-12 py-5 gap-5">
      <Sidebar />
      <main className="col-span-10">
        <Outlet />
      </main>
    </div>
  );
}
