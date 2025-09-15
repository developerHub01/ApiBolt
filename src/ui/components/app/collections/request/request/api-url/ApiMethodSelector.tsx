import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import type { THTTPMethods } from "@/types/request-response.types";
import { updateRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import {
  ApiMethodSelect,
  ApiMethodSelectContent,
  ApiMethodSelectTrigger,
} from "@/components/ui/api-method-select";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { selectIsHttpMethodType } from "@/context/redux/request-response/selectors/request-list";

const ApiMethodSelector = memo(() => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectSelectedTab)!;
  const methodType = useAppSelector(selectIsHttpMethodType);

  const handleChange = useCallback(
    (value: THTTPMethods) => {
      dispatch(
        updateRequestOrFolder({
          method: value,
          id: selectedTab,
        })
      );
    },
    [dispatch, selectedTab]
  );

  if (!selectedTab) return null;

  return (
    <div
      className="shrink-0 select-none"
      style={{
        width: "120px",
      }}
    >
      <ApiMethodSelect
        defaultValue={methodType}
        onValueChange={handleChange}
        value={methodType}
      >
        <ApiMethodSelectTrigger methodType={methodType} className="w-full" />
        <ApiMethodSelectContent
          sideOffset={10}
          activeValue={methodType}
          style={{
            width: "120px",
          }}
        />
      </ApiMethodSelect>
    </div>
  );
});

ApiMethodSelector.displayName = "API method selector";

export default ApiMethodSelector;
