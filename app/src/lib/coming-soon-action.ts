import {
  createActionHeaders,
  type ActionError,
  type ActionGetResponse,
} from "@solana/actions";

import { resolveIconUrl } from "@/lib/solana";

interface ComingSoonActionOptions {
  origin: string;
  iconPath: string;
  title: string;
  description: string;
  label: string;
  errorMessage: string;
}

export function createComingSoonGetResponse(
  options: ComingSoonActionOptions,
): ActionGetResponse {
  return {
    type: "action",
    icon: resolveIconUrl(options.origin, options.iconPath),
    title: options.title,
    description: options.description,
    label: options.label,
    disabled: true,
    error: {
      message: options.errorMessage,
    },
  };
}

export function createComingSoonPostResponse(errorMessage: string): Response {
  const headers = createActionHeaders();
  const error: ActionError = { message: errorMessage };

  return Response.json(error, { status: 501, headers });
}