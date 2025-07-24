import { memo } from "react";
import { Accordion } from "@/components/ui/accordion";
import SettingItem from "@/components/app/setting/content/SettingItem";
import { AnimatedDialogContent } from "@/components/ui/animated-dialog";

const SettingContent = memo(() => {
  return (
    <AnimatedDialogContent>
      <Accordion type="multiple" className="w-full">
        <SettingItem id="item-1" title="Product Information">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </SettingItem>
        <SettingItem id="item-2" title="Product Information">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </SettingItem>
        <SettingItem id="item-3" title="Product Information">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </SettingItem>
      </Accordion>
    </AnimatedDialogContent>
  );
});

export default SettingContent;
