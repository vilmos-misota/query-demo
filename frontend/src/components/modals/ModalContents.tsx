import { AddPlayerForm } from "../forms/AddPlayerForm";
import { EditPlayerForm } from "../forms/EditPlayerForm";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

export const EditPlayerSheet: React.FC = () => {
  return (
    <>
      <SheetHeader>
        <SheetTitle>Edit Player</SheetTitle>
        <SheetDescription>Make changes to the player here.</SheetDescription>
      </SheetHeader>

      <EditPlayerForm />
    </>
  );
};

// export const EditTeamSheet: React.FC = () => {
//   const { closeModal } = useModal();
//   return (
//     <>
//       <SheetHeader>
//         <SheetTitle>Edit Team</SheetTitle>
//         <SheetDescription>Make changes to the team here.</SheetDescription>
//       </SheetHeader>
//       {/* Add your form fields here */}
//       <SheetFooter>
//         <SheetClose asChild>
//           <Button onClick={closeModal}>Save changes</Button>
//         </SheetClose>
//       </SheetFooter>
//     </>
//   );
// };

export const AddPlayerDialog: React.FC = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Player</DialogTitle>
        <DialogDescription>Enter new player details.</DialogDescription>
      </DialogHeader>
      <AddPlayerForm />
    </>
  );
};

// export const AddTeamDialog: React.FC = () => {
//   const { closeModal } = useModal();
//   return (
//     <>
//       <DialogHeader>
//         <DialogTitle>Add Team</DialogTitle>
//         <DialogDescription>Enter new team details.</DialogDescription>
//       </DialogHeader>
//       {/* Add your form fields here */}
//       <DialogFooter>
//         <Button onClick={closeModal}>Add Team</Button>
//       </DialogFooter>
//     </>
//   );
// };
