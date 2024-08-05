import { Dialog, DialogContent } from "../ui/dialog";
import { Sheet, SheetContent } from "../ui/sheet";
import { useModal } from "./ModalContext";

interface ModalProps {
  id: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ id, children }) => {
  const { activeModal, closeModal } = useModal();

  if (!activeModal || activeModal.id !== id) {
    return null;
  }

  const CommonProps = {
    open: true,
    onOpenChange: closeModal,
  };

  return activeModal.type === "sheet" ? (
    <Sheet {...CommonProps}>
      <SheetContent>{children}</SheetContent>
    </Sheet>
  ) : (
    <Dialog {...CommonProps}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
