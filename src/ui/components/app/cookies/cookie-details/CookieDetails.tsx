import { memo, useMemo } from "react";
import {
  selectIsCookieEditing,
  selectSelectedCookie,
  selectSelectedEditingCookieDetails,
} from "@/context/redux/cookies/selectors/cookies";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { cookieToString } from "@/utils/cookies";
import CopyButton from "@/components/ui/copy-button";
import { Copy as CopyIcon } from "lucide-react";
import { dateFormater } from "@/utils";
import CookieDetailsEditBottomAction from "@/components/app/cookies/cookie-details/CookieDetailsEditBottomAction";
import CookieEditor from "@/components/app/cookies/cookie-editor/CookieEditor";
import CookiePreview from "@/components/app/cookies/cookie-preview/CookiePreview";
import ContentWrapper from "@/components/app/cookies/ContentWrapper";
import { handleChangeEditCookie } from "@/context/redux/cookies/cookies-slice";
import type { CookieInterface } from "@/types/cookies.types";

const nonEditableField = new Set(["creation", "lastAccessed", "key"]);

const CookieDetails = memo(() => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectSelectedCookie);
  const editingDetails = useAppSelector(selectSelectedEditingCookieDetails);
  const isEditing = useAppSelector(selectIsCookieEditing);

  const cookie = useMemo(
    () =>
      details
        ? cookieToString({
            ...details,
          })
        : "",
    [details]
  );

  const filteredDetails = useMemo(() => {
    if (!details) return details;
    const updated = { ...details };

    if (updated["creation"] && typeof updated["creation"] === "string")
      updated.creation = dateFormater(updated.creation);
    if (updated["expires"] && typeof updated["expires"] === "string")
      updated.creation = dateFormater(updated.expires);
    if (updated["lastAccessed"] && typeof updated["lastAccessed"] === "string")
      updated.creation = dateFormater(updated.lastAccessed);
    return updated;
  }, [details]);

  const handleChange = ({
    key,
    value,
  }: {
    key: keyof CookieInterface;
    value: CookieInterface[keyof CookieInterface];
  }) => {
    dispatch(
      handleChangeEditCookie({
        payload: {
          [key]: value,
        },
      })
    );
  };

  return (
    <ContentWrapper
      key={`cookie-${filteredDetails?.key ?? ""}`}
      open={Boolean(filteredDetails)}
    >
      {cookie && (
        <div className="w-full bg-accent/50 text-accent-foreground text-sm px-3 py-4 rounded-md relative wrap-break-word break-all leading-relaxed">
          <CopyButton
            value={cookie}
            className="absolute top-1 right-1"
            size="iconXs"
            Icon={CopyIcon}
            align="end"
          />
          {cookie}
        </div>
      )}
      {isEditing && editingDetails ? (
        <CookieEditor
          details={editingDetails!}
          onChange={handleChange}
          bottomAction={<CookieDetailsEditBottomAction />}
          nonEditableField={nonEditableField}
        />
      ) : (
        <CookiePreview details={filteredDetails!} />
      )}
    </ContentWrapper>
  );
});

export default CookieDetails;
