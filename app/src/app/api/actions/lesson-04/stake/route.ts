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
    title: "Lesson 4 · Stake 0.01 SOL — Coming Soon",
    description: [
      "Staking means delegating SOL to validators who secure the network.",
      "Choose Marinade liquid staking (mSOL) or native delegate.",
      "",
      "🚧 Coming Soon — Marinade and native stake paths are planned.",
    ].join("\n"),
    label: "Coming Soon",
    errorMessage: "Stake lesson is not live yet. Marinade integration coming soon.",
  });

  return Response.json(payload, { headers });
}

export async function OPTIONS() {
  return new Response(null, { headers });
}

export async function POST() {
  return createComingSoonPostResponse(
    "Stake lesson not implemented yet. Marinade integration is planned.",
  );
}