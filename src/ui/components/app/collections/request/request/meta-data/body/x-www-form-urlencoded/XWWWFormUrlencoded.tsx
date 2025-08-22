import XWWWFormUrlencodedContent from "@/components/app/collections/request/request/meta-data/body/x-www-form-urlencoded/XWWWFormUrlencodedContent";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";

const XWWWFormUrlencoded = () => {
  return (
    <MetaDataWrapper label="X-WWW-Form-Urlencoded">
      <XWWWFormUrlencodedContent />
    </MetaDataWrapper>
  );
};

export default XWWWFormUrlencoded;
