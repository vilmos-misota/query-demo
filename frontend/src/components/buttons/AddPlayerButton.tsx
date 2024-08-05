import { useModal } from "../modals/ModalContext";
import { Button } from "../ui/button";

export default function AddPlayerToCurrentTeamButton({
  teamId,
}: {
  teamId: string;
}) {
  const { openModal } = useModal();
  return (
    <Button
      onClick={() => {
        openModal({ type: "dialog", id: "addPlayer", teamIdToAssign: teamId });
      }}
    >
      Add player
    </Button>
  );
}
