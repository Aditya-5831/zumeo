import ResumeItem from "@/components/resumes/ResumeItem";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { ResumeDataInclude } from "@/lib/types";
import { FilePlus2 } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "../../../lib/auth";

const Resumes = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const resumes = await db.resume.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: ResumeDataInclude,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Resumes</h1>
          <p className="text-muted-foreground text-sm">
            Create, edit and manage your resumes.
          </p>
        </div>
        <Link href={"/resumes/create"} className={buttonVariants({})}>
          <FilePlus2 />
          Add Resume
        </Link>
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
