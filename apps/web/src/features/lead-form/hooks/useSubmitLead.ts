import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { submitLead } from "../api";
import type { LeadFormInput } from "../validators/lead.schema";

// Sends the form once, even if the person presses Send again after a timeout
// or an error. Each send carries a submissionId. Sending the same data again
// reuses it, so the API ignores the repeat if the first request got through.
// Changed data gets a new id, and a successful send clears it.
export function useSubmitLead() {
  const attempt = useRef<{ id: string; data: string } | null>(null);

  return useMutation({
    mutationFn: (data: LeadFormInput) => {
      const json = JSON.stringify(data);
      if (attempt.current?.data !== json) {
        attempt.current = { id: crypto.randomUUID(), data: json };
      }
      return submitLead({ ...data, submissionId: attempt.current.id });
    },
    onSuccess: () => {
      attempt.current = null;
    },
  });
}
