import CreateResumeButton from "@/components/resumes/CreateResumeButton";
import ResumeItem from "@/components/resumes/ResumeItem";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { ResumeDataInclude } from "@/lib/types";
import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your resumes",
};

const Resumes = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const [resumes, user, resumeCount] = await Promise.all([
    db.resume.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: ResumeDataInclude,
    }),
    db.user.findUnique({
      where: { id: session.user.id },
      select: {
        isPro: true,
      },
    }),
    db.resume.count({
      where: {
        userId: session.user.id,
      },
    }),
  ]);

  if (!user) {
    return null;
  }

  const canCreateResume = user.isPro || resumeCount < 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-medium">Resumes</h1>
          <p className="text-muted-foreground text-sm">
            Create, edit and manage your resumes.
          </p>
        </div>
        <CreateResumeButton canCreateResume={canCreateResume} />
      </div>
      <Separator />
      <div className="flex grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
};

export default Resumes;
