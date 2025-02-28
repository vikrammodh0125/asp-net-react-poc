import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_CREATE_NOTE, QUERY_GET_NOTES } from "../../constants";
import { apiRequest } from "../../services";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: MUTATION_CREATE_NOTE,
    mutationFn: async (payload) => {
      return await apiRequest('/notes', "POST", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_GET_NOTES);
    }
  });
};