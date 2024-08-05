import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "./navigation/Navbar";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl w-full mx-auto relative">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
