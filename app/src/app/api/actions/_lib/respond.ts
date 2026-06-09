import type { ActionError } from "@solana/actions";
import { actionHeaders } from "@/lib/headers";

/** Normalize thrown values into Solana Actions `ActionError` JSON. */
export function toActionError(err: unknown): ActionError {
  if (typeof err === "string") {
    return { message: err };
  }

  if (err instanceof Error) {
    return { message: err.message };
  }

  return { message: "An unknown error occurred" };
}

/** Standard OPTIONS preflight for every Action route. */
export function actionOptions(): Response {
  return Response.json(null, { headers: actionHeaders });
}

type ActionJsonInit = {
  status?: number;
  headers?: HeadersInit;
};

/** JSON response with mandatory Action CORS headers. */
export function actionJson<T>(body: T, init: ActionJsonInit = {}): Response {
  return Response.json(body, {
    status: init.status ?? 200,
    headers: {
      ...actionHeaders,
      ...init.headers,
    },
  });
}

/** 400 (or custom status) ActionError response. */
export function actionError(err: unknown, status = 400): Response {
  return actionJson(toActionError(err), { status });
}

/**
 * Wrap a GET handler with consistent try/catch + CORS headers.
 *
 * @example
 * export const GET = actionGet(async (req) => ({ type: "action", title: "..." }));
 */
export function actionGet(
  handler: (req: Request) => Promise<unknown> | unknown,
): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    try {
      const payload = await handler(req);
      return actionJson(payload);
    } catch (err) {
      console.error("[action GET]", err);
      return actionError(err);
    }
  };
}

/**
 * Wrap a POST handler with consistent try/catch + CORS headers.
 *
 * @example
 * export const POST = actionPost(async (req) => createPostResponse({ ... }));
 */
export function actionPost(
  handler: (req: Request) => Promise<unknown> | unknown,
  options?: { errorStatus?: number },
): (req: Request) => Promise<Response> {
  const errorStatus = options?.errorStatus ?? 400;

  return async (req: Request) => {
    try {
      const payload = await handler(req);
      return actionJson(payload);
    } catch (err) {
      console.error("[action POST]", err);
      return actionError(err, errorStatus);
    }
  };
}