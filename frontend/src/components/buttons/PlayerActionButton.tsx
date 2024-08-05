import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDeletePlayer } from "../../entities/player/player.action";
import { useModal } from "../modals/ModalContext";
import { Player } from "../../entities/player/player.schema";

export default function PlayerActionButton({ player }: { player: Player }) {
  const { openModal } = useModal();
  const deletePlayer = useDeletePlayer();

  const handleDelete = () => {
    deletePlayer.mutate({
      playerId: player.id,
      associatedTeamId: player.teamId,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            openModal({ type: "sheet", id: "editPlayer", targetPlayer: player })
          }
        >
          Edit player
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleDelete}>
          Delete player
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
