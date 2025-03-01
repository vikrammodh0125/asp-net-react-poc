import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_DELETE_NOTE, QUERY_GET_NOTES } from "../../constants";
import { apiRequest } from "../../services";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: MUTATION_DELETE_NOTE,
    mutationFn: async (id) => {
      return await apiRequest(`/notes/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_GET_NOTES);
    }
  });
};