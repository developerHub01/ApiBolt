import {
  memo,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectRequestUrlTokenPort } from "@/context/redux/request-url/request-url-selector";
import { requestUrlUpdateToken } from "@/context/redux/request-url/request-url-thunk";

const PortToken = memo(() => {
  const dispatch = useAppDispatch();
  const port = useAppSelector(selectRequestUrlTokenPort);
  const [portState, setPortState] = useState<string>(port);

  useEffect(() => {
    if (port === portState) return;
    setPortState(port);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [port]);

  const handleChangePort = (e: ChangeEvent<HTMLInputElement>) =>
    setPortState(e.target.value);

  const handleBlurPort = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === port) return;

    dispatch(
      requestUrlUpdateToken({
        id: "port",
        value: portState,
      })
    );
  };

  return (
    <ButtonLikeDiv variant={"secondary"}>
      <input
        placeholder="Port eg. 3000"
        className="w-full border-0 border-b font-normal"
        value={portState}
        onChange={handleChangePort}
        onBlur={handleBlurPort}
      />
    </ButtonLikeDiv>
  );
});

export default PortToken;
