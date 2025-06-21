import Features from "@/components/home/Features";
import MockResumeTemplateUI from "@/components/home/MockResumeTemplateUI";
import Testimonals from "@/components/home/Testimonals";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="relative h-full w-full py-10">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-center gap-y-16 sm:gap-y-9">
          {/* HERO SECTION */}
          <h1 className="text-center text-4xl leading-[1.2] font-semibold tracking-wide sm:text-[42px]">
            Build Your Perfect Resume with{" "}
            <span className="text-primary">ZUMEO</span> – <br />
            Fast, Easy, and Tailored for Success!
          </h1>
          <p className="text-muted-foreground text-center text-sm">
            Create a professional, ATS-friendly resume in minutes with our
            AI-powered resume builder. <br />
            Get personalized suggestions, optimize for job keywords, and land
            more interviews effortlessly
          </p>

          <Link
            href={"/resumes"}
            className={buttonVariants({
              size: "xl",
              className: "group",
            })}
          >
            Get started
            <ArrowRight className="size-4 duration-100 group-hover:translate-x-1" />
          </Link>

          {/* MOCK RESUME UI */}
          <MockResumeTemplateUI />

          {/* FEATURES SECTION */}
          <Features />

          {/* TESTIMONALS */}
          <Testimonals />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Home;
