const RequestListPanel = () => {
  return (
    <RequestListPanelWrapper>
      <div className="flex flex-col h-full">
        <ListTopAction />
        <RequestListPanelContent />
      </div>
    </RequestListPanelWrapper>
  );
};

export default RequestListPanel;
