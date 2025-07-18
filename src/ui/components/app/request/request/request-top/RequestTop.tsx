import RequestTopLeft from "@/components/app/request/request/request-top/RequestTopLeft";
// import RequestTopRight from "@/components/app/request/request/request-top/RequestTopRight";

const RequestTop = () => {
  return (
    <div className="w-full flex justify-between items-center gap-4 pb-2">
      <RequestTopLeft />
      {/* <RequestTopRight /> */}
    </div>
  );
};
RequestTop.displayName = "Request top";

export default RequestTop;
