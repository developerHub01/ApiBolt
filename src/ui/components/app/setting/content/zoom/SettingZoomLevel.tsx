import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SettingItemHorizontalLayout from "@/components/app/setting/content/zoom/SettingItemHorizontalLayout";

const zoomList = Array.from({ length: 11 }).map((_, index) => (index + 5) * 10);

const SettingZoomLevel = () => {
  // const zoomLevelGlobal = useAppSelector(
  //   (state) => state.setting.globalSetting.zoomLevel
  // );
  // const zoomLevelLocal = useAppSelector(
  //   (state) => state.setting.settings?.zoomLevel
  // );

  // const [zoomLevel, setZoomLevel] = useState(zoomLevelLocal ?? zoomLevelGlobal);

  // useEffect(()=>{

  // }, [])

  return (
    <SettingItemHorizontalLayout>
      <p>Adjust the interface scale to your preference</p>
      <Select value="100">
        <SelectTrigger className="w-full max-w-40">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Zoom</SelectLabel>
            {zoomList.map((size: number) => (
              <SelectItem key={size} value={String(size)}>
                {size}%
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SettingItemHorizontalLayout>
  );
};

export default SettingZoomLevel;
