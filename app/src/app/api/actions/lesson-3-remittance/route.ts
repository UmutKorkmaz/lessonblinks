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
  buildActionStrings,
  formatSuccessMessage,
  getActionDict,
} from "@/lib/lessons/action-text";
import {
  getRemittanceRecipient,
  LESSON_03_ACTION_PATH,
  LESSON_03_USDC_AMOUNT,
  LESSON_03_USDC_DECIMALS,
} from "@/lib/lessons/lesson-03";
import {
  getConnection,
  getUsdcMint,
  resolveIconUrl,
} from "@/lib/solana";

const headers = createActionHeaders();

export async function GET(req: Request) {
  const origin = getActionOrigin(req);
  const actionUrl = getActionUrl(req);
  const strings = buildActionStrings(getActionDict(actionUrl), 3);

  const payload: ActionGetResponse = {
    type: "action",
    icon: resolveIconUrl(origin, "/icon.svg"),
    title: strings.title,
    description: strings.description,
    label: strings.label,
    links: {
      actions: [
        {
          type: "transaction",
          label: strings.label,
          // actionUrl keeps the incoming query (`to`, `lang`) for the POST
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
    const strings = buildActionStrings(getActionDict(requestUrl), 3);
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
      LESSON_03_USDC_AMOUNT,
      LESSON_03_USDC_DECIMALS,
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
        message: formatSuccessMessage(strings, {
          recipient: recipient.toBase58(),
        }),
        links: {
          next: {
            type: "post",
            href: `${LESSON_03_ACTION_PATH}/complete?to=${recipient.toBase58()}`,
          },
        },
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
