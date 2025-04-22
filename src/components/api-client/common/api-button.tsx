import React from "react";
import { Button } from "@/components/ui/button";
import ApiMethod from "@/components/api-client/common/api-method";

interface ApiButtonProps {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  label: string;
}

const ApiButton = ({ method, label }: ApiButtonProps) => {
  return (
    <Button type="button">
      <ApiMethod method={method} /> {label}
    </Button>
  );
};

export default ApiButton;
