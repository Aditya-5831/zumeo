"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const deleteResume = async (id: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("User not authenticated.");
  }

  const resume = await db.resume.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  if (resume.photoUrl) {
    await del(resume.photoUrl);
  }

  await db.resume.delete({
    where: { id },
  });

  revalidatePath("/resumes");
};
