import { createActionHeaders } from "@solana/actions";

import {
  createComingSoonGetResponse,
  createComingSoonPostResponse,
} from "@/lib/coming-soon-action";

const headers = createActionHeaders();

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);

  const payload = createComingSoonGetResponse({
    requestUrl,
    iconPath: "/icon.svg",
    title: "Lesson 5 · Claim Graduation NFT — Coming Soon",
    description: [
      "You finished Lessons 1–4! Claim your Graduate Badge NFT.",
      "",
      "It's a compressed NFT (cNFT) — real ownership, tiny cost.",
      "Complete all prior lessons, then tap Claim Badge when this lesson goes live.",
      "",
      "🚧 Coming Soon — cNFT Metaplex integration is planned.",
    ].join("\n"),
    label: "Claim Badge",
    errorMessage:
      "Graduation mint is not live yet. cNFT Metaplex integration is planned.",
  });

  return Response.json(payload, { headers });
}

export async function OPTIONS() {
  return new Response(null, { headers });
}

export async function POST() {
  return createComingSoonPostResponse(
    "Graduation NFT mint not implemented yet. cNFT Metaplex integration is planned.",
  );
}