import AppMainContentLayoutWrapper from "@/components/app/AppMainContentLayoutWrapper";
import LTRLayout from "@/components/app/collections/request/LTRLayout";

const CollectionsLayout = () => {
  // const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

  return (
    <AppMainContentLayoutWrapper>
      {/* {layoutTypes === "ltr" ? <LTRLayout /> : <RTLLayout />} */}
      <LTRLayout />
    </AppMainContentLayoutWrapper>
  );
};

export default CollectionsLayout;
