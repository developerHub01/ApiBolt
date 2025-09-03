import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Plus as AddIcon } from "lucide-react";

const urlPartList = ["protocol", "host", "text", "environment variables"];

const AddUrlPart = () => {
  return (
    <Menubar className="p-0 border-0">
      <MenubarMenu>
        <ButtonLikeDiv variant={"secondary"} className="p-0 aspect-square">
          <MenubarTrigger className="w-full h-full justify-center cursor-pointer">
            <AddIcon />
          </MenubarTrigger>
        </ButtonLikeDiv>
        <MenubarContent side="bottom" align="end">
          {urlPartList.map((part) => (
            <MenubarItem key={part} className="capitalize">
              {part}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AddUrlPart;
