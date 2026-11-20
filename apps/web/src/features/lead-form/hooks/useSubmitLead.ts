import { useMutation } from "@tanstack/react-query";
import { submitLead } from "../api";

export function useSubmitLead() {
  return useMutation({ mutationFn: submitLead });
}
