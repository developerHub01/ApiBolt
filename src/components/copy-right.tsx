"use client";

import React, { memo, useCallback, useState } from "react";
import { X as CloseIcon } from "lucide-react";
import Link from "next/link";
import useMounted from "@/hooks/use-mounted";

const githubLink = "https://github.com/developerHub01";

const CopyRight = memo(() => {
  const [show, setShow] = useState<boolean>(true);
  const mounted = useMounted();

  const handleClick = useCallback(() => {
    setShow(false);
  }, []);

  if (!mounted || !show) return null;

  return (
    <div className="p-1 pt-1 bg-accent relative">
      <p className="text-center text-xs md:text-sm select-none">
        All rights reserve for
        <Link
          href={githubLink}
          target="_blank"
          className="text-primary underline ml-1"
        >
          Shakil
        </Link>
      </p>
      <button
        onClick={handleClick}
        className="absolute top-1/2 right-1.5 -translate-y-1/2 p-0.5 cursor-pointer aspect-square rounded-full hover:bg-accent-foreground/20 transition-all duration-100"
      >
        <CloseIcon size={16} />
      </button>
    </div>
  );
});

export default CopyRight;
