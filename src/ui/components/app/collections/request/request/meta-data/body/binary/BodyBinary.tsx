import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus as AddIcon, X as CloseIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  deleteRequestBodyBinary,
  updateRequestBodyBinary,
} from "@/context/redux/request-response/thunks/body-binary";
import { selectBinaryData } from "@/context/redux/request-response/selectors/body-binary";

const BodyBinary = memo(() => {
  const dispatch = useAppDispatch();
  const binaryData = useAppSelector(selectBinaryData);

  console.log({ binaryData });

  const handleUpdateBinary = useCallback(
    () => dispatch(updateRequestBodyBinary()),
    [dispatch]
  );

  const handleDeleteBinary = useCallback(
    () => dispatch(deleteRequestBodyBinary()),
    [dispatch]
  );

  return (
    <div className="w-full h-full flex justify-center items-center p-2.5">
      <div className="flex justify-center items-center max-w-4/5">
        {binaryData ? (
          <>
            <Button
              variant={"secondary"}
              className="rounded-r-none w-full max-w-96 cursor-auto"
            >
              <span className="w-full overflow-hidden truncate">
                {binaryData?.file}
              </span>
            </Button>
            <Separator orientation="vertical" />
            <Button
              size={"icon"}
              variant={"secondary"}
              className="rounded-l-none"
              onClick={handleDeleteBinary}
            >
              <CloseIcon />
            </Button>
          </>
        ) : (
          <>
            {/* <input type="file" id="binary-data" hidden onChange={handleFile} /> */}
            <label
              htmlFor="binary-data"
              className="cursor-pointer"
              onClick={handleUpdateBinary}
            >
              <Button variant={"secondary"} className="pointer-events-none">
                <AddIcon size={16} /> Add new file from local machine
              </Button>
            </label>
          </>
        )}
      </div>
    </div>
  );
});

BodyBinary.displayName = "Request body binary data";

export default BodyBinary;
