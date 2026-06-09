import { createActionHeaders } from "@solana/actions";

const ACTIONS_JSON = {
  rules: [
    {
      pathPattern: "/lesson/01-tip-usdc",
      apiPath: "/api/actions/lesson-1-usdc",
    },
    {
      pathPattern: "/lesson/02-tip-creator",
      apiPath: "/api/actions/lesson-2-tip",
    },
    {
      pathPattern: "/lesson/03-remittance",
      apiPath: "/api/actions/lesson-3-remittance",
    },
    {
      pathPattern: "/lesson/04-swap",
      apiPath: "/api/actions/lesson-4-swap",
    },
    {
      pathPattern: "/graduate",
      apiPath: "/api/actions/lesson-5/claim",
    },
  ],
} as const;

const headers = createActionHeaders();

export async function GET() {
  return Response.json(ACTIONS_JSON, { headers });
}

export async function OPTIONS() {
  return new Response(null, { headers });
}