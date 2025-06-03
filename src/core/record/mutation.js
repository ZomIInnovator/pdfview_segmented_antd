import { useMutation } from "@tanstack/react-query";
import { addRecord, delRecordById } from "./action";

export function useCreateRecord() {
  return useMutation({
    mutationFn: (data) => addRecord(data),
  });
}

export function useDeleteRecord() {
  return useMutation({
    mutationFn: delRecordById,
  });
}
