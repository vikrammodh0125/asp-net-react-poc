import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_EDIT_NOTE, QUERY_GET_NOTES } from "../../constants";
import { apiRequest } from "../../services";

export const useEditNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: MUTATION_EDIT_NOTE,
    mutationFn: async (payload) => {
      return await apiRequest(`/notes/${payload.id}`, "PUT", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_GET_NOTES);
    }
  });
};