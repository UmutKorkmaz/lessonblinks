import { createActionHeaders } from "@solana/actions";

/** pathPatterns must match the lesson slugs served by /lesson/[slug]. */
const ACTIONS_JSON = {
  rules: [
    {
      pathPattern: "/lesson/tip-usdc",
      apiPath: "/api/actions/lesson-1-usdc",
    },
    {
      pathPattern: "/lesson/tip-creator-sol",
      apiPath: "/api/actions/lesson-2-tip",
    },
    {
      pathPattern: "/lesson/remittance",
      apiPath: "/api/actions/lesson-3-remittance",
    },
    {
      pathPattern: "/lesson/swap-sol-usdc",
      apiPath: "/api/actions/lesson-4-swap",
    },
    {
      pathPattern: "/lesson/claim-graduation-nft",
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