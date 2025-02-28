import { useQuery } from "@tanstack/react-query";
import { QUERY_GET_USERS } from "../../constants";
import { apiRequest } from "../../services";

export const useGetUsers = () => {
  return useQuery({
    queryKey: QUERY_GET_USERS,
    queryFn: async () => {
      return await apiRequest("/users");
    },
  })
};