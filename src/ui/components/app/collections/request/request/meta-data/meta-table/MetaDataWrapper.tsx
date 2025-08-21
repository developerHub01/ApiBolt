import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import { selectMetaBulkEditOpen } from "@/context/redux/request-response/request-response-selector";
import BulkEditor from "@/components/app/collections/request/request/meta-data/meta-table/BulkEditor";
import BulkEditButton from "@/components/app/collections/request/request/meta-data/meta-table/BulkEditButton";

interface MetaDataWrapperProps {
  label?: string;
  labelPrefix?: React.ReactNode;
  children: React.ReactNode;
}

const MetaDataWrapper = ({
  label,
  labelPrefix = "",
  children,
}: MetaDataWrapperProps) => {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {label && (
          <p className="text-foreground text-sm select-none">{label}</p>
        )}
        {labelPrefix}
        <BulkEditButton />
      </div>
      <Metadata>{children}</Metadata>
    </div>
  );
};

interface MetaDataProps {
  children: React.ReactNode;
}

const Metadata = ({ children }: MetaDataProps) => {
  const isBulkEditorOpen = useAppSelector(selectMetaBulkEditOpen);

  if (isBulkEditorOpen) return <BulkEditor />;

  return (
    <ScrollArea className="w-full min-h-0 [&>div>div]:h-full border-t">
      <div className="w-full h-full flex flex-col gap-4 items-center pb-5">
        {children}
      </div>
    </ScrollArea>
  );
};

export default MetaDataWrapper;
