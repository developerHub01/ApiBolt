import BorderedWrapper from "@/components/ui/bordered-wrapper";
import { Button } from "@/components/ui/button";
import type { TBinaryData } from "@shared/types/request-response.types";

const BodyBinary = ({ file, path }: NonNullable<TBinaryData>) => {
  return (
    <BorderedWrapper className="w-full h-full flex-1 flex justify-center items-center">
      <Button variant={"secondary"} className="w-fit max-w-96 cursor-auto">
        <span className="w-full overflow-hidden truncate">
          {file ?? path.split("/").at(-1)}
        </span>
      </Button>
    </BorderedWrapper>
  );
};

export default BodyBinary;
