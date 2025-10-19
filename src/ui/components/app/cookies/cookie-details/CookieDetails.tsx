import { memo, useMemo } from "react";
import {
  selectIsCookieEditing,
  selectSelectedCookie,
} from "@/context/redux/cookies/selectors/cookies-selector";
import { useAppSelector } from "@/context/redux/hooks";
import { cookieToString } from "@/utils/cookies";
import CopyButton from "@/components/ui/copy-button";
import { Copy as CopyIcon } from "lucide-react";
import { dateFormater } from "@/utils";
import CookieDetailsEditBottomAction from "@/components/app/cookies/cookie-details/CookieDetailsEditBottomAction";
import CookieEditor from "@/components/app/cookies/cookie-editor/CookieEditor";
import CookiePreview from "@/components/app/cookies/cookie-preview/CookiePreview";
import ContentWrapper from "@/components/app/cookies/ContentWrapper";

const CookieDetails = memo(() => {
  const details = useAppSelector(selectSelectedCookie);
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

  return (
    <ContentWrapper
      key={`cookie-${filteredDetails?.key}`}
      open={Boolean(filteredDetails)}
    >
      {cookie && (
        <div className="w-full bg-accent/50 text-accent-foreground text-sm px-3 py-4 rounded-md relative break-words break-all leading-relaxed">
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
      {isEditing ? (
        <CookieEditor
          details={filteredDetails!}
          onChange={() => {}}
          bottomAction={<CookieDetailsEditBottomAction />}
        />
      ) : (
        <CookiePreview details={filteredDetails!} />
      )}
    </ContentWrapper>
  );
});

export default CookieDetails;
