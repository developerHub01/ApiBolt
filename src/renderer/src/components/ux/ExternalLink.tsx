import React, { RefAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";

const ExternalLink = ({
  children,
  ...props
}: LinkProps & RefAttributes<HTMLAnchorElement>) => {
  return (
    <Link target="_blank" {...props}>
      {children}
    </Link>
  );
};

export default ExternalLink;
