import { cn } from "@/lib/utils";

interface ApiMethodProps {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

const ApiMethod = ({ method = "GET" }: ApiMethodProps) => {
  return (
    <p
      className={cn("text-sm font-semibold", {
        "text-green-500": method === "GET",
        "text-blue-500": method === "POST",
        "text-yellow-500": method === "PUT",
        "text-orange-500": method === "PATCH",
        "text-red-500": method === "DELETE",
      })}
    >
      {method}
    </p>
  );
};

export default ApiMethod;