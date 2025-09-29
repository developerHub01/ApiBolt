import Searchbar from "@/components/ui/searchbar";
import { memo } from "react";

interface SettingHttpSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const SettingHttpSearch = memo(
  ({ value, onChange }: SettingHttpSearchProps) => {
    return (
      <div className="flex justify-end">
        <Searchbar
          value={value}
          onChange={onChange}
          placeholder="Search by code"
        />
      </div>
    );
  }
);

export default SettingHttpSearch;
