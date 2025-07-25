interface SettingItemLayoutProps {
  children: React.ReactNode;
}
const SettingItemHorizontalLayout = ({ children }: SettingItemLayoutProps) => {
  return <div className="flex justify-between gap-2">{children}</div>;
};

export default SettingItemHorizontalLayout;
