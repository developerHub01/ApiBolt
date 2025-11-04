import { memo } from "react";
import { AnimatedDialogContent } from "@/components/ui/animated-dialog";

const HistoryContent = memo(() => {
  return (
    <AnimatedDialogContent>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
        consequuntur maxime voluptatibus atque ratione accusantium adipisci id,
        possimus laborum? Obcaecati laborum id amet quasi non perferendis aut,
        ipsum magnam veritatis?
      </p>
    </AnimatedDialogContent>
  );
});

export default HistoryContent;
