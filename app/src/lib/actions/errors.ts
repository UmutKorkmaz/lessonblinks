import type { ActionError } from "@solana/actions";

export function toActionError(err: unknown): ActionError {
  if (typeof err === "string") {
    return { message: err };
  }
  if (err instanceof Error) {
    return { message: err.message };
  }
  return { message: "An unknown error occurred" };
}