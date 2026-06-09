import {
  createActionHeaders,
  createPostResponse,
  type ActionGetResponse,
  type ActionPostRequest,
} from "@solana/actions";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { PublicKey, Transaction } from "@solana/web3.js";

import { getActionOrigin, getActionUrl } from "@/lib/action-origin";
import {
  getConnection,
  getCreatorPubkey,
  getUsdcMint,
  resolveIconUrl,
} from "@/lib/solana";

const USDC_DECIMALS = 6;
/** Fixed remittance amount: 0.05 USDC */
const REMITTANCE_AMOUNT = 50_000;

const headers = createActionHeaders();

function getRemittanceRecipient(requestUrl: URL): PublicKey {
  const to =
    requestUrl.searchParams.get("to") ??
    process.env.REMITTANCE_WALLET_PUBKEY ??
    process.env.NEXT_PUBLIC_REMITTANCE_WALLET_PUBKEY;

  if (to) {
    try {
      return new PublicKey(to);
    } catch {
      throw new Error('Invalid "to" query parameter');
    }
  }

  return getCreatorPubkey();
}

export async function GET(req: Request) {
  const origin = getActionOrigin(req);
  const actionUrl = getActionUrl(req);

  const payload: ActionGetResponse = {
    type: "action",
    icon: resolveIconUrl(origin, "/icon.svg"),
    title: "Lesson 3 · Send USDC Abroad",
    description: [
      "Remittance is sending money across borders — same USDC token, same Solana network, arriving in seconds instead of business days.",
      "",
      "USDC is a dollar-pegged stablecoin. You'll send exactly 0.05 USDC to a demo family wallet abroad — a real SPL token transfer in one signature.",
      "",
      "Keep a little SOL in your wallet for network fees.",
      "",
      "🧪 Beta — recipient routing and corridor copy may change as we refine this lesson.",
    ].join("\n"),
    label: "Send 0.05 USDC",
    links: {
      actions: [
        {
          type: "transaction",
          label: "Send 0.05 USDC",
          href: actionUrl.toString(),
        },
      ],
    },
  };

  return Response.json(payload, { headers });
}

export async function OPTIONS() {
  return new Response(null, { headers });
}

export async function POST(req: Request): Promise<Response> {
  try {
    const requestUrl = getActionUrl(req);
    const body = (await req.json()) as ActionPostRequest;
    const account = body.account;

    if (!account) {
      return Response.json(
        { message: "Missing account in request body" },
        { status: 400, headers },
      );
    }

    const sender = new PublicKey(account);
    const recipient = getRemittanceRecipient(requestUrl);
    const mint = getUsdcMint();
    const connection = getConnection();

    const senderAta = getAssociatedTokenAddressSync(mint, sender);
    const recipientAta = getAssociatedTokenAddressSync(mint, recipient);

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const instruction = createTransferCheckedInstruction(
      senderAta,
      mint,
      recipientAta,
      sender,
      REMITTANCE_AMOUNT,
      USDC_DECIMALS,
    );

    const transaction = new Transaction({
      feePayer: sender,
      blockhash,
      lastValidBlockHeight,
    }).add(instruction);

    const payload = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message:
          "Send 0.05 USDC abroad to complete Lesson 3. Review the recipient and amount in your wallet before signing.",
      },
    });

    return Response.json(payload, { headers });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to build USDC remittance transfer";

    return Response.json({ message }, { status: 500, headers });
  }
}