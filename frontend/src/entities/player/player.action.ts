import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addPlayer, deletePlayer, editPlayer } from "./player.service";
import { queryKeys } from "../../cache/queryKeys";
import { Player, Players } from "./player.schema";
import { toast } from "sonner";

/*
    if this call is successful, the cache will be invalidated and a new server request will fire off 
    on components that are using the data to sync the cache with the server
*/

export const useAddPlayer = (): UseMutationResult<
  Player,
  Error,
  Partial<Player>,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (playerData: Partial<Player>) => addPlayer(playerData),

    onSuccess: (data: Player) => {
      const { id, teamId } = data;

      queryClient.invalidateQueries({
        queryKey: queryKeys.players.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.players.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.teams.roster(teamId),
      });

      toast.success("Player added successfully");
    },

    onError: (error: Error) => {
      console.error("Failed to add player:", error);
      toast.error("Failed to add player");
    },
  });
};

/*
    In contrast here, if the call is successful, the cache will be updated with the new data directly
    without the need to refetch the data from the server.
*/

interface DeletePlayerVariables {
  playerId: number;
  associatedTeamId: number;
}

export function useDeletePlayer(): UseMutationResult<
  void,
  Error,
  DeletePlayerVariables,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playerId }: DeletePlayerVariables) => deletePlayer(playerId),

    onSuccess: (_, { playerId: deletedPlayerId, associatedTeamId }) => {
      // Update players.all cache
      queryClient.setQueryData(
        queryKeys.players.all,
        (oldData: Players | undefined) => {
          return oldData
            ? oldData.filter((player) => player.id !== deletedPlayerId)
            : undefined;
        }
      );

      // Remove the deleted player's detail query from cache
      queryClient.removeQueries({
        queryKey: queryKeys.players.detail(deletedPlayerId),
      });

      // Update teams.roster cache
      queryClient.setQueryData(
        queryKeys.teams.roster(associatedTeamId),
        (oldData: Players | undefined) => {
          return oldData
            ? oldData.filter((player) => player.id !== deletedPlayerId)
            : undefined;
        }
      );

      toast.success("Player deleted successfully");
    },

    // This would revalidate the cache by refetching the data from the server

    //   onSuccess: (_, deletedPlayerId) => {
    //     // Invalidate and refetch
    //     queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
    //     queryClient.invalidateQueries({
    //       queryKey: queryKeys.players.detail(deletedPlayerId),
    //     });
    //     queryClient.invalidateQueries({
    //       queryKey: queryKeys.teams.roster(associatedTeamId),
    //     });
    //   },
  });
}

/*
This is an optimistic update, where the cache is updated with the new data directly
But if the call fails, the cache will be reverted back to the previous state
*/

export const useEditPlayer = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Player,
    Error,
    Player,
    { previousPlayer: Player | undefined }
  >({
    mutationFn: (player: Player) => {
      return editPlayer(player.id, player);
    },

    onMutate: async (player: Player) => {
      const playerId = player.id;
      const associatedTeamId = player.teamId;

      await queryClient.cancelQueries({
        queryKey: queryKeys.players.detail(playerId),
      });
      await queryClient.cancelQueries({ queryKey: queryKeys.players.all });
      await queryClient.cancelQueries({
        queryKey: queryKeys.teams.roster(associatedTeamId),
      });

      const previousPlayer = queryClient.getQueryData<Player>(
        queryKeys.players.detail(playerId)
      );

      if (previousPlayer) {
        const optimisticPlayer = { ...previousPlayer, ...player };
        queryClient.setQueryData(
          queryKeys.players.detail(playerId),
          optimisticPlayer
        );

        queryClient.setQueryData<Players | undefined>(
          queryKeys.players.all,
          (oldData) =>
            oldData?.map((player) =>
              player.id === playerId ? optimisticPlayer : player
            )
        );

        queryClient.setQueryData<Players | undefined>(
          queryKeys.teams.roster(associatedTeamId),
          (oldData) =>
            oldData?.map((player) =>
              player.id === playerId ? optimisticPlayer : player
            )
        );
      }

      return { previousPlayer };
    },

    onSuccess: (updatedPlayer, player) => {
      const playerId = player.id;
      const associatedTeamId = player.teamId;

      queryClient.setQueryData<Players | undefined>(
        queryKeys.players.all,
        (oldData) =>
          oldData?.map((player) =>
            player.id === playerId ? updatedPlayer : player
          )
      );

      queryClient.setQueryData(
        queryKeys.players.detail(playerId),
        updatedPlayer
      );

      queryClient.setQueryData<Players | undefined>(
        queryKeys.teams.roster(associatedTeamId),
        (oldData) =>
          oldData?.map((player) =>
            player.id === playerId ? updatedPlayer : player
          )
      );
    },

    onError: (_, player, context) => {
      const playerId = player.id;
      const associatedTeamId = player.teamId;

      if (context?.previousPlayer) {
        queryClient.setQueryData(
          queryKeys.players.detail(playerId),
          context.previousPlayer
        );
        queryClient.setQueryData<Players | undefined>(
          queryKeys.players.all,
          (oldData) =>
            oldData?.map((player) =>
              player.id === playerId ? context.previousPlayer! : player
            )
        );
        queryClient.setQueryData<Players | undefined>(
          queryKeys.teams.roster(associatedTeamId),
          (oldData) =>
            oldData?.map((player) =>
              player.id === playerId ? context.previousPlayer! : player
            )
        );
      }
    },

    onSettled: (_, __, player) => {
      const playerId = player.id;
      const associatedTeamId = player.teamId;

      queryClient.invalidateQueries({
        queryKey: queryKeys.players.detail(playerId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.teams.roster(associatedTeamId),
      });
    },
  });
};
