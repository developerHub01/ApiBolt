import type React from "react";

interface AuthKeyValueWrapperProps {
  children: React.ReactNode;
}

const AuthKeyValueWrapper = ({ children }: AuthKeyValueWrapperProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      {children}
    </div>
  );
};

export default AuthKeyValueWrapper;
