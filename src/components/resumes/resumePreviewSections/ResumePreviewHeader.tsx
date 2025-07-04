import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BorderStyles } from "../BorderStyleButton";

interface ResumePreviewHeaderProps {
  resumeData: ResumeValues;
}

const ResumePreviewHeader = ({ resumeData }: ResumePreviewHeaderProps) => {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    email,
    phone,
    colorHex,
    borderStyle,
  } = resumeData;

  const [imageSrc, setImageSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo);
      setImageSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    setImageSrc(typeof photo === "string" ? "" : photo);
  }, [photo]);

  return (
    <div className="flex w-full items-center gap-6">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="user image"
          width={100}
          height={100}
          className="aspect-square rounded-md object-cover"
          priority
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold" style={{ color: colorHex }}>
          {firstName} {lastName}
        </h1>
        <span className="text-xl font-semibold" style={{ color: colorHex }}>
          {jobTitle}
        </span>
        <p className="text-muted-foreground text-sm">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
};

export default ResumePreviewHeader;
