import { Dot } from "lucide-react";
import Image from "next/image";
import React from "react";

const WORK_EXPERIANCE = [
  {
    title: "Full Stack Developer",
    company: "TechNova Solutions",
    duration: "Mar 2022 – Present",
    experiance: [
      "Built and maintained scalable web applications using React, Node.js, and PostgreSQL",
      "Implemented secure user authentication with JWT and integrated payment gateways like Stripe",
      "Collaborated with designers and backend engineers to deliver responsive and performant features",
    ],
  },
  {
    title: "Frontend Developer",
    company: "PixelWave Labs",
    duration: "Jan 2021 – Feb 2022",
    experiance: [
      "Developed interactive user interfaces using React and Tailwind CSS",
      "Integrated RESTful APIs and managed state using Redux Toolkit and React Query",
      "Focused on accessibility, responsiveness, and cross-browser compatibility",
    ],
  },
  {
    title: "Software Developer Intern",
    company: "NextGen Softwares",
    duration: "May 2020 – Dec 2020",
    experiance: [
      "Assisted in developing features in a MERN stack application",
      "Participated in code reviews and agile ceremonies like daily standups and sprint planning",
      "Documented components and contributed to improving internal development workflows",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institute: "National Institute of Technology, Trichy",
    duration: "2016 – 2020",
    grade: "8.5 CGPA",
  },
  {
    degree: "Senior Secondary (XII), Science",
    institute: "St. Xavier's Senior Secondary School",
    duration: "2014 – 2016",
    grade: "92%",
  },
  {
    degree: "Secondary (X)",
    institute: "St. Xavier's Senior Secondary School",
    duration: "2012 – 2014",
    grade: "9.4 CGPA",
  },
];

const SKILLS = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "TypeScript",
  "JavaScript",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Git & GitHub",
  "REST APIs",
  "JWT & OAuth",
];

const MockResumeTemplateUI = () => {
  return (
    <div className="hidden w-full max-w-[1180px] rounded-lg bg-gray-50 p-2 shadow-md ring-1 ring-gray-950/10 sm:flex md:flex lg:flex xl:flex 2xl:flex">
      <div className="h-full w-full rounded-lg p-12 pb-20 shadow-xl ring-1 ring-gray-950/10">
        {/* PERSONAL INFO */}
        <div className="flex items-center gap-x-6">
          <Image
            src={"/person.jpg"}
            width={130}
            height={130}
            alt="person"
            className="aspect-square rounded-lg object-cover"
          />
          <div className="flex flex-col items-start gap-y-3">
            <h2 className="text-primary text-4xl font-semibold tracking-normal">
              Jason Watson
            </h2>
            <h3 className="text-primary text-xl">Full-stack developer</h3>
            <div className="text-muted-foreground flex items-center justify-center">
              <span className="">Erfurt, Germany</span>
              <Dot className="-mx-1 size-8" />
              <span>0123456789</span>
              <Dot className="-mx-1 size-8" />
              <span>JasonW@gmail.com</span>
            </div>
          </div>
        </div>
        {/* SEPARATOR */}
        <div className="bg-primary my-10 h-2 w-full" />

        {/* WORK EXPERIENCE */}
        <div className="flex flex-col gap-y-7">
          <h3 className="text-primary text-3xl font-medium">Work experience</h3>
          {WORK_EXPERIANCE.map(({ title, company, experiance, duration }) => (
            <div key={title} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-primary text-2xl font-medium">
                  {title}
                </span>
                <span className="text-primary text-lg font-medium">
                  {duration}
                </span>
              </div>
              <h4 className="mb-3 text-xl font-medium text-gray-800">
                {company}
              </h4>
              {experiance.map((description, index) => (
                <p key={index} className="mb text-base">
                  - {description}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* SEPARATOR */}
        <div className="bg-primary my-10 h-2 w-full" />

        {/* EDUCATION */}
        <div className="flex flex-col gap-y-7">
          <h3 className="text-primary text-3xl font-medium">Education</h3>
          {EDUCATION.map(({ degree, grade, institute, duration }) => (
            <div key={degree} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-primary text-2xl font-medium">
                  {degree}
                </span>
                <span className="text-primary text-lg font-medium">
                  {duration}
                </span>
              </div>
              <h4 className="mb-3 text-xl font-medium text-gray-800">
                {institute}
              </h4>
              <span className="mb-3 text-[17px] font-medium text-gray-800">
                {grade}
              </span>
            </div>
          ))}

          {/* SEPARATOR */}
          <div className="bg-primary my-7 h-2 w-full" />

          {/* SKILLS */}
          <div>
            <h3 className="text-primary mb-8 text-3xl font-medium">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="bg-primary rounded-lg px-4 py-1.5 font-medium text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockResumeTemplateUI;
