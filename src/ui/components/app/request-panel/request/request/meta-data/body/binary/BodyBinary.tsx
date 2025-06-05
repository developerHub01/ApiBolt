import { type ChangeEvent, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus as AddIcon, X as CloseIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { handleChangeBinaryData } from "@/context/redux/request-response/request-response-slice";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";

const BodyBinary = memo(() => {
  const dispatch = useAppDispatch();
  // const { binaryData, selectedTab, handleChangeBinaryData } =
  // useRequestResponse();
  const binaryData = useAppSelector(
    (state) => state.requestResponse.binaryData[state.requestResponse.selectedTab!]
  );

  const handleChange = useCallback(
    (file: File | null = null) => {
      dispatch(
        handleChangeBinaryData({
          file,
        })
      );
    },
    [dispatch]
  );

  const handleFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      handleChange(file);
    },
    [handleChange]
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
                {binaryData?.name}
              </span>
            </Button>
            <Separator orientation="vertical" />
            <Button
              size={"icon"}
              variant={"secondary"}
              className="rounded-l-none"
              onClick={() => handleChange()}
            >
              <CloseIcon />
            </Button>
          </>
        ) : (
          <>
            <input type="file" id="binary-data" hidden onChange={handleFile} />
            <label htmlFor="binary-data" className="cursor-pointer">
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
