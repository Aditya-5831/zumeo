import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSessionCompleted(session);
    }

    return new Response("Handled", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
};

const handleSessionCompleted = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer as string;
  const stripeSessionId = session.id;

  if (!userId || !stripeCustomerId) {
    throw new Error("Misssing userId or customerId");
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      isPro: true,
      stripeCustomerId,
    },
  });

  await db.userSubscription.create({
    data: {
      userId,
      stripeCustomerId,
      stripeSessionId,
    },
  });
};
