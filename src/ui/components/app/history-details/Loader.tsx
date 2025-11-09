import { AnimatedDialogLoader } from "@/components/ui/animated-dialog";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";

const Loader = () => {
  const { isLoading } = useHistoryDetails();
  return <AnimatedDialogLoader isLoading={isLoading} />;
};

export default Loader;
