import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilePlus2 } from "lucide-react";
import Link from "next/link";

const Resumes = () => {
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
      <div className="flex flex-wrap">
        <Link
          href={"/resumes/create"}
          className="hover:text-primary hover:border-primary flex min-h-48 min-w-36 flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-gray-400 text-gray-400 transition-all"
        >
          <FilePlus2 className="size-14" strokeWidth={1} />
          <span className="text-sm font-medium">Add Resume</span>
        </Link>
      </div>
    </div>
  );
};

export default Resumes;
