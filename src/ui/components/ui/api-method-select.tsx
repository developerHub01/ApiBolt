import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { THTTPMethods } from "@/types/request-response.types";

const methodList: Array<THTTPMethods> = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
];

function ApiMethodSelect({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return (
    <SelectPrimitive.Root
      data-slot="select"
      {...props}
      defaultValue={props.defaultValue ?? methodList[0]}
    />
  );
}

function ApiMethodSelectTrigger({
  className,
  size = "default",
  methodType,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
  methodType: THTTPMethods;
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm whitespace-nowrap outline-0 focus:outline-0 font-semibold cursor-pointer border-x-2",
        {
          "border-green-500 bg-green-500/5 text-green-500":
            methodType === "get",
          "border-blue-500 bg-blue-500/5 text-blue-500": methodType === "post",
          "border-yellow-500 bg-yellow-500/5 text-yellow-500":
            methodType === "put",
          "border-orange-500 bg-orange-500/5 text-orange-500":
            methodType === "patch",
          "border-red-500 bg-red-500/5 text-red-500": methodType === "delete",
        },
        className
      )}
      {...props}
    >
      <span className="uppercase">{methodType}</span>
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className={cn("size-4")} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function ApiMethodSelectContent({
  className,
  children = null,
  position = "popper",
  activeValue,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  activeValue: THTTPMethods;
  children?: React.ReactNode;
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <ApiMethodSelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "py-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {methodList.map((id) => (
            <ApiMethodSelectItem
              key={id}
              value={id}
              activeValue={activeValue}
            />
          ))}
          {children}
        </SelectPrimitive.Viewport>
        <ApiMethodSelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function ApiMethodSelectItem({
  className,
  activeValue,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & {
  activeValue: THTTPMethods;
}) {
  const { value } = props;
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative w-full cursor-pointer items-center rounded-none p-1 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 border-x-2 border-transparent",
        {
          "hover:bg-green-500/5": value === "get",
          "hover:bg-blue-500/5": value === "post",
          "hover:bg-yellow-500/5": value === "put",
          "hover:bg-orange-500/5": value === "patch",
          "hover:bg-red-500/5": value === "delete",

          "border-green-500": activeValue === "get" && value === activeValue,
          "border-blue-500": activeValue === "post" && value === activeValue,
          "border-yellow-500": activeValue === "put" && value === activeValue,
          "border-orange-500": activeValue === "patch" && value === activeValue,
          "border-red-500": activeValue === "delete" && value === activeValue,

          "hover:border-green-500/80": value === "get" && value !== activeValue,
          "hover:border-blue-500/80": value === "post" && value !== activeValue,
          "hover:border-yellow-500/80":
            value === "put" && value !== activeValue,
          "hover:border-orange-500/80":
            value === "patch" && value !== activeValue,
          "hover:border-red-500/80":
            value === "delete" && value !== activeValue,
        },
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="w-full">
        <div
          className={cn(
            "w-full h-7 text-sm flex justify-start items-center px-2 py-1 uppercase rounded-md font-bold",
            {
              "text-green-500": value === "get",
              "text-blue-500": value === "post",
              "text-yellow-500": value === "put",
              "text-orange-500": value === "patch",
              "text-red-500": value === "delete",
            }
          )}
        >
          {value}
        </div>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function ApiMethodSelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function ApiMethodSelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  ApiMethodSelect,
  ApiMethodSelectContent,
  ApiMethodSelectItem,
  ApiMethodSelectScrollDownButton,
  ApiMethodSelectScrollUpButton,
  ApiMethodSelectTrigger,
};
