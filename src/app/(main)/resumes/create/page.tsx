import ResumeEditor from "@/components/resumes/ResumeEditor";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { ResumeDataInclude } from "@/lib/types";
import { headers } from "next/headers";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

const CreateResume = async ({ searchParams }: PageProps) => {
  const { resumeId } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await db.resume.findUnique({
        where: { id: resumeId, userId: session.user.id },
        include: ResumeDataInclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
};

export default CreateResume;
