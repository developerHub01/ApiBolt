import Empty from "@/components/ui/empty";

const NoCookies = () => {
  return (
    <Empty
      label="No Cookies"
      description="It seems like, no cookies saved in project."
      animationSrc="./lottie/nodata.lottie"
      showFallback
      innerClassName="w-56"
      className="h-full"
      key="no-cookies"
    />
  );
};

export default NoCookies;
