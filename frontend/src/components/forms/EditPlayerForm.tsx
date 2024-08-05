import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Player,
  PlayerUpdateSchema,
} from "../../entities/player/player.schema";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useModal } from "../modals/ModalContext";
import { useEditPlayer } from "../../entities/player/player.action";
import { toast } from "sonner";

export function EditPlayerForm() {
  const editPlayer = useEditPlayer();

  const { closeModal, targetPlayer } = useModal();

  const form = useForm<Player>({
    resolver: zodResolver(PlayerUpdateSchema),
    defaultValues:
      {
        name: targetPlayer?.name,
        position: targetPlayer?.position,
        age: targetPlayer?.age,
        teamId: targetPlayer?.teamId,
      } || {},
  });

  const onSubmit = (data: Player) => {
    if (!targetPlayer) {
      return;
    }

    const updatedPlayer = { ...data, id: targetPlayer.id };

    toast.promise(editPlayer.mutateAsync(updatedPlayer), {
      loading: "Updating player...",
      success: "Player updated successfully",
      error: "Failed to update player",
    });

    closeModal();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Forward">Forward</SelectItem>
                  <SelectItem value="Midfielder">Midfielder</SelectItem>
                  <SelectItem value="Defender">Defender</SelectItem>
                  <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.formState.isDirty}>
          Save changes
        </Button>
      </form>
    </Form>
  );
}
