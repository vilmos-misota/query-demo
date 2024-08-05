import { Link } from "@tanstack/react-router";
import { Team } from "../../entities/team/team.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";
import RosterStats from "../blocks/RosterStats";

export default function TeamOverviewCard({ team }: { team: Team }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
        <CardDescription>{team.city}</CardDescription>
      </CardHeader>
      <CardContent>
        <RosterStats teamId={team.id} />
      </CardContent>
      <CardFooter className="self-end justify-self-end">
        <Button asChild>
          <Link to="/teams/$teamId" params={{ teamId: team.id.toString() }}>
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
