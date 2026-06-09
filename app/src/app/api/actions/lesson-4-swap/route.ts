import { createActionHeaders } from "@solana/actions";

import { getActionOrigin } from "@/lib/action-origin";
import {
  createComingSoonGetResponse,
  createComingSoonPostResponse,
} from "@/lib/coming-soon-action";

const headers = createActionHeaders();

export async function GET(req: Request) {
  const payload = createComingSoonGetResponse({
    origin: getActionOrigin(req),
    iconPath: "/icon.svg",
    title: "Lesson 4 · Swap SOL → USDC — Coming Soon",
    description: [
      "A swap trades one token for another on-chain.",
      "This lesson will walk you through swapping 0.01 SOL into USDC via Jupiter.",
      "",
      "🚧 Coming Soon — Jupiter integration is planned.",
    ].join("\n"),
    label: "Coming Soon",
    errorMessage: "Swap lesson is not live yet. Jupiter integration coming soon.",
  });

  return Response.json(payload, { headers });
}

export async function OPTIONS() {
  return new Response(null, { headers });
}

export async function POST() {
  return createComingSoonPostResponse(
    "Swap lesson not implemented yet. Jupiter integration is planned.",
  );
}