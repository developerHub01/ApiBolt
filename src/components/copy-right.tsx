import Link from "next/link";
import React from "react";

const githubLink = "https://github.com/developerHub01";

const CopyRight = () => {
  return (
    <div className="p-1 pt-1">
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
    </div>
  );
};

export default CopyRight;
