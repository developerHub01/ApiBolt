import AppMainContentLayoutWrapper from "@/components/app/AppMainContentLayoutWrapper";
import LTRLayout from "@/components/app/collections/request/LTRLayout";
import RTLLayout from "@/components/app/collections/request/RTLLayout";
import useCheckApplyingLayout from "@/hooks/setting/use-check-applying-layout";
import type { TLayoutSetting } from "@/types/setting.types";

const CollectionsLayout = () => {
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

  return (
    <AppMainContentLayoutWrapper>
      {layoutTypes === "ltr" ? <LTRLayout /> : <RTLLayout />}
    </AppMainContentLayoutWrapper>
  );
};

export default CollectionsLayout;
