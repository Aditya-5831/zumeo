import { headers } from "next/headers";
import { auth } from "./auth";
import db from "./db";

export const extendedAuth = {
  async getSession() {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { isPro: true },
    });

    return {
      ...session,
      user: {
        ...session.user,
        isPro: user?.isPro ?? false,
      },
    };
  },
};
