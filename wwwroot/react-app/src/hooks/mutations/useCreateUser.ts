import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_CREATE_USER, QUERY_GET_USERS } from "../../constants";
import { apiRequest } from "../../services";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: MUTATION_CREATE_USER,
    mutationFn: async (payload: { name: string; email: string }) => {
      return await apiRequest("/users", "POST", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_GET_USERS });
    },
  });
};
