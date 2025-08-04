import AddAction from "@/components/app/collections/request-list/AddAction";
import ProjectName from "@/components/app/collections/request-list/ProjectName";

const ListTopAction = () => {
  return (
    <div className="flex items-center justify-between gap-1 px-2 py-1.5 border-b-2">
      <ProjectName />
      <AddAction />
    </div>
  );
};

export default ListTopAction;
