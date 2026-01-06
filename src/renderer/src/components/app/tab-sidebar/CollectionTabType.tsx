import RequestMethodTag from "@/components/app/RequestMethodTag";
import { THTTPMethods } from "@shared/types/request-response.types";
import { cn } from "@/lib/utils";

interface Props {
  method?: THTTPMethods | null;
  haveChildren: boolean;
  isShort?: boolean;
  isFlexibleSize?: boolean;
}

const CollectionTabType = ({
  method,
  isShort = false,
  haveChildren = false,
  isFlexibleSize = true,
}: Props) => {
  return (
    <>
      {(haveChildren || method) && (
        <div
          className={cn(
            "flex justify-center items-center",
            isFlexibleSize
              ? "w-fit"
              : {
                  "w-11": isShort,
                  "w-10": !isShort,
                },
          )}
        >
          {haveChildren && (
            <img
              className="w-6 h-full object-contain"
              src="./icons/folder.png"
              alt="folder"
            />
          )}
          {method && (
            <RequestMethodTag
              method={method as THTTPMethods}
              shortCut={true}
              shortCutSizeForAll={isShort ? 3 : undefined}
              className={"w-full"}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CollectionTabType;
