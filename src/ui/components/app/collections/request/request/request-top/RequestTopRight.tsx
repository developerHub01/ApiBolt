// import { type ChangeEvent, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   ChevronDown as DownIcon,
//   Download as DownloadIcon,
//   Save as SaveIcon,
//   EllipsisVertical as ThreeDotIcon,
//   FileDown as ImportIcon,
//   BrushCleaning as ClearIcon,
// } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { useRequestResponse } from "@/context/request/RequestResponseProvider";
// import Warning from "@/components/warning";
// import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
// import {
//   handleClearRequestResponse,
//   handleIsDownloadRequestWithBase64,
// } from "@/context/redux/request-response/request-response-slice";
// import { importRequestFromFile } from "@/context/redux/request-response/request-response-thunk";

// const RequestTopRight = () => {
//   const dispatch = useAppDispatch();
//   const selectedTab = useAppSelector(
//     (state) => state.requestResponse.selectedTab
//   );
//   const { handleDownloadRequest } = useRequestResponse();
//   const requestName = useAppSelector(
//     (state) =>
//       state.requestResponse.requestList[state.requestResponse.selectedTab!]
//         ?.name ?? "Request"
//   );
//   const isDownloadRequestWithBase64 = useAppSelector(
//     (state) =>
//       state.requestResponse.isDownloadRequestWithBase64[
//         state.requestResponse.selectedTab!
//       ]
//   );

//   const handleExport = useCallback(async () => {
//     await handleDownloadRequest(selectedTab!);

//     toast("Successfully downloaded!!", {
//       description: `${requestName}.json downloaded successfully`,
//     });
//   }, [handleDownloadRequest, requestName, selectedTab]);

//   const handleImport = useCallback(
//     async (file: File | undefined) => {
//       if (!file) return toast("Please select a valid JSON file.");
//       dispatch(
//         importRequestFromFile({
//           file,
//           selectedTab: selectedTab!,
//           cb: (message) => {
//             toast(message);
//           },
//         })
//       );
//     },
//     [dispatch, selectedTab]
//   );
//   const handleCheck = (value: boolean) =>
//     dispatch(handleIsDownloadRequestWithBase64(value));

//   const handleClear = () => dispatch(handleClearRequestResponse());

//   return (
//     <div className="flex items-center">
//       <Button variant={"outline"} className="rounded-r-none">
//         <SaveIcon /> Save
//       </Button>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button size={"icon"} variant={"ghost"} className="rounded-l-none">
//             <DownIcon />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent
//           className="p-0 w-fit min-w-40 flex flex-col [&>button]:justify-start"
//           side="bottom"
//           align="end"
//         >
//           <DropdownMenuGroup>
//             <DropdownMenuItem>
//               <SaveIcon /> Save As
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <ImportButton handleImport={handleImport} />
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <ExportButton
//                 handleExport={handleExport}
//                 isChecked={Boolean(isDownloadRequestWithBase64)}
//                 handleChangeCheck={handleCheck}
//               />
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={handleClear}>
//               <ClearIcon /> Clear All
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// };
// RequestTopRight.displayName = "Request top right";

// interface ExportButtonProps {
//   handleExport: () => void;
//   isChecked: boolean;
//   handleChangeCheck: (value: boolean) => void;
// }

// const ExportButton = ({
//   handleExport,
//   isChecked,
//   handleChangeCheck,
// }: ExportButtonProps) => {
//   return (
//     <div className="w-full flex justify-between items-center gap-1">
//       <Button
//         variant={"ghost"}
//         onClick={handleExport}
//         className="flex-1 justify-start"
//       >
//         <DownloadIcon /> Export
//       </Button>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="ghost" size={"iconXs"} className="mr-2">
//             <ThreeDotIcon />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           className="w-60 p-2 flex flex-col gap-1"
//           side="bottom"
//           align="end"
//         >
//           <div className="w-full flex items-center gap-2">
//             <Label
//               htmlFor="terms"
//               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//             >
//               <Checkbox
//                 id="terms"
//                 checked={isChecked}
//                 onCheckedChange={handleChangeCheck}
//               />
//               <p>Also download Base64</p>
//             </Label>
//           </div>
//           <Warning label="Base64 may slow download" className="items-center" />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// interface ImportButtonProps {
//   handleImport: (file: File | undefined) => void;
// }

// const ImportButton = ({ handleImport }: ImportButtonProps) => {
//   const handleChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) => {
//       handleImport(e.target.files?.[0]);
//     },
//     [handleImport]
//   );

//   return (
//     <label htmlFor="import-request" className="cursor-pointer">
//       <input
//         type="file"
//         id="import-request"
//         accept="application/json"
//         onChange={handleChange}
//         hidden
//       />
//       <Button
//         variant={"ghost"}
//         className="pointer-events-none w-full justify-start"
//       >
//         <ImportIcon /> import
//       </Button>
//     </label>
//   );
// };

// export default RequestTopRight;
