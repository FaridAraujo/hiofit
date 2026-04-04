"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type BlurImageProps = Omit<ImageProps, "onLoad"> & {
  className?: string;
};

export default function BlurImage({ className, alt, ...props }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      className={cn(
        "transition-all duration-700 ease-out",
        loaded ? "scale-100 blur-0" : "scale-105 blur-md",
        className,
      )}
      onLoad={() => setLoaded(true)}
    />
  );
}
