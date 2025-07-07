"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { del, put } from "@vercel/blob";
import { headers } from "next/headers";

export const saveResume = async (values: ResumeValues) => {
  const { id } = values;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { photo, workExperiences, education, ...resumeValues } =
    resumeSchema.parse(values);

  if (!session?.user) {
    return;
  }

  const existingResume = id
    ? await db.resume.findUnique({
        where: { id, userId: session.user.id },
      })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found.");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    const blob = await put(`resume_photos/${photo.name}`, photo, {
      access: "public",
      contentType: photo.type,
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return db.resume.update({
      where: { id, userId: session.user.id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: education?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  } else {
    return db.resume.create({
      data: {
        ...resumeValues,
        userId: session.user.id,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: education?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
};
