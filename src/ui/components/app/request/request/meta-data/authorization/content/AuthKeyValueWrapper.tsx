import type React from "react";

interface AuthKeyValueWrapperProps {
  children: React.ReactNode;
}

const AuthKeyValueWrapper = ({ children }: AuthKeyValueWrapperProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
      {children}
    </div>
  );
};

export default AuthKeyValueWrapper;
