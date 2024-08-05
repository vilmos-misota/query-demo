import { Players } from "../../entities/player/player.schema";
import PlayerActionButton from "../buttons/PlayerActionButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function PlayerLists({ players }: { players: Players }) {
  return (
    <Table>
      <TableCaption>A list of players</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Age</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.id}>
            <TableCell className="font-medium">{player.name}</TableCell>
            <TableCell>{player.position}</TableCell>
            <TableCell>{player.age}</TableCell>
            <TableCell>
              <PlayerActionButton player={player} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
