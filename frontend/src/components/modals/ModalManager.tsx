import { Modal } from "./Modal";
import { AddPlayerDialog, EditPlayerSheet } from "./ModalContents";

export const ModalManager: React.FC = () => {
  return (
    <>
      <Modal id="editPlayer">
        <EditPlayerSheet />
      </Modal>
      {/* <Modal id="editTeam">
        <EditTeamSheet />
      </Modal> */}
      <Modal id="addPlayer">
        <AddPlayerDialog />
      </Modal>
      {/* <Modal id="addTeam">
        <AddTeamDialog />
      </Modal> */}
    </>
  );
};
