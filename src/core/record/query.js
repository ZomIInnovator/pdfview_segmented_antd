import { useQuery } from "@tanstack/react-query";
import { getRecordFilter, getRecordID } from "./action";

export function useGetRecordFilter(search) {
  return useQuery({
    queryKey: ["getRecordFilter", search],
    queryFn: () => getRecordFilter(search),
  });
}

export function useQueryRecordById(id) {
  return useQuery({
    queryKey: ["getRecordID", id],
    queryFn: () => getRecordID(id),
  });
}
