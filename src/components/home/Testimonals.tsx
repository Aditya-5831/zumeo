import { Star } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Sarah Mills",
    title: "Software Engineer",
    quote:
      "This AI resume builder saved me hours—templates are sharp and the AI suggestions are spot-on!",
    image: "/testimonial1.jpg",
  },
  {
    name: "James Lee",
    title: "Marketing Manager",
    quote:
      "I landed calls within days! The skill suggestions are incredibly relevant.",
    image: "/testimonial2.jpg",
  },
  {
    name: "Maya Thompson",
    title: "Product Designer",
    quote:
      "Beautiful, clean templates and easy customization—my resume has never looked better.",
    image: "/testimonial3.webp",
  },
  {
    name: "David Brown",
    title: "Data Analyst",
    quote:
      "The AI editor helped me polish every line—and I got invited for multiple interviews!",
    image: "/testimonial4.webp",
  },
];

const Testimonals = () => {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-center text-[26px] font-medium sm:text-4xl">
        Here what our customers say <br /> about{" "}
        <span className="text-primary border-primary border-b-4">Zumeo</span>
      </h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {TESTIMONIALS.map(({ image, name, quote, title }) => (
          <div
            key={name}
            className="flex max-w-[500px] flex-col gap-5 p-3 sm:p-5"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="text-primary fill-primary size-5"
                />
              ))}
            </div>
            <p className="text-base/7 text-gray-600">{quote}</p>
            <div className="flex items-center gap-3">
              <div className="relative size-11">
                <Image
                  src={image}
                  alt="user"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-700">
                  {name}
                </span>
                <span className="text-sm text-gray-600">{title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonals;
