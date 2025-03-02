import { useQuery } from "@tanstack/react-query";
import { QUERY_GET_NOTES } from "../../constants";
import { apiRequest } from "../../services";

export const useGetNotes = () => {
  return useQuery({
    queryKey: QUERY_GET_NOTES,
    queryFn: async () => {
      return await apiRequest<void,{id: string; content: string}[]>("/notes");
    },
  })
};