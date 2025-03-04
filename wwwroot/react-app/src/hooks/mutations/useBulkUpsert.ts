import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MUTATION_USER_MANAGEMENT_BULK_UPSERT,
  QUERY_GET_NOTES,
  QUERY_GET_USERS,
} from "../../constants";
import { apiRequest } from "../../services";
import { BulkUpsertItem, Note, User } from "../../types";

export const useBulkUpsert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MUTATION_USER_MANAGEMENT_BULK_UPSERT,
    mutationFn: async (payload: {
      users: BulkUpsertItem<User>[];
      notes: BulkUpsertItem<Note>[];
    }) => {
      return await apiRequest("/user-management/upsert", "POST", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_GET_NOTES });
      queryClient.invalidateQueries({ queryKey: QUERY_GET_USERS });
    },
  });
};
