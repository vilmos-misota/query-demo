import { Link } from "@tanstack/react-router";
import Overview from "./Overview";

const Links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Teams",
    url: "/teams",
  },
  {
    name: "Players",
    url: "/players",
  },
];

export default function Navbar() {
  return (
    <nav className="h-10 bg-secondary flex justify-start">
      <div className="flex max-w-screen-xl mx-auto items-center justify-between w-full">
        <div className="flex gap-2 text-secondary-foreground">
          {Links.map((link) => (
            <Link
              key={link.url}
              to={link.url}
              activeProps={{
                style: {
                  fontWeight: "bold",
                },
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Overview />
      </div>
    </nav>
  );
}
