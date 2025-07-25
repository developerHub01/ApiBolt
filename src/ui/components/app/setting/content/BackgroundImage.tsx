import { Plus as AddIcon } from "lucide-react";
import SettingItem from "@/components/app/setting/content/SettingItem";

const BackgroundImage = () => {
  return (
    <SettingItem id="background" title="Background Images">
      <p>
        Manage your background images. Uploaded images will fade one after
        another.
      </p>
      <div>
        <div>
          <p>Choose Background images</p>
          <div className="grid grid-cols-3 gap-1">
            <div className="w-full h-full aspect-square border border-accent rounded-md">
              <AddIcon />
            </div>
          </div>
        </div>
      </div>
    </SettingItem>
  );
};

export default BackgroundImage;
