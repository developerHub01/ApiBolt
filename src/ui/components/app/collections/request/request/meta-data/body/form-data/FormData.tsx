import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import AddNewMetaData from "@/components/app/collections/request/request/meta-data/AddNewMetaData";

const FormData = () => {
  return (
    <MetaDataWrapper label="Form-data">
      <MetaTable />
      <AddNewMetaData label="Add Form Data" />
    </MetaDataWrapper>
  );
};

export default FormData;
