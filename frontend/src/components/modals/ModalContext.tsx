import React, { createContext, useContext, useState, ReactNode } from "react";
import { Player } from "../../entities/player/player.schema";
import { Team } from "../../entities/team/team.schema";

type ModalType = "sheet" | "dialog";
type ModalProps = {
  type: ModalType;
  id: string;
  targetPlayer?: Player | null;
  targetTeam?: Team | null;
  teamIdToAssign?: string | null;
};

interface ModalState {
  type: ModalType;
  id: string;
}

interface ModalContextType {
  activeModal: ModalState | null;
  openModal: (modalProps: ModalProps) => void;
  closeModal: () => void;
  targetPlayer?: Player | null;
  targetTeam?: Team | null;
  teamIdToAssign?: string | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeModal, setActiveModal] = useState<ModalState | null>(null);
  const [targetPlayer, setTargetPlayer] = useState<Player | null>(null);
  const [targetTeam, setTargetTeam] = useState<Team | null>(null);
  const [teamIdToAssign, setTeamIdToAssign] = useState<string | null>(null);

  const openModal = (modalState: ModalProps) => {
    const { type, id, targetPlayer, targetTeam, teamIdToAssign } = modalState;
    setActiveModal({ type, id });
    if (targetPlayer) {
      setTargetPlayer(targetPlayer);
    }

    if (targetTeam) {
      setTargetTeam(targetTeam);
    }

    if (teamIdToAssign) {
      setTeamIdToAssign(teamIdToAssign);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setTargetPlayer(null);
    setTargetTeam(null);
    setTeamIdToAssign(null);
  };

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openModal,
        closeModal,
        targetPlayer,
        targetTeam,
        teamIdToAssign,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
