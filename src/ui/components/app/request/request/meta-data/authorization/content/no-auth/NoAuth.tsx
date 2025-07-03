const NoAuth = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-1.5 px-3 py-5 md:py-8">
      <h3 className="text-lg font-semibold">No Auth</h3>
      <p className="text-sm text-muted-foreground">
        This request does not use any authorization.
      </p>
    </div>
  );
};

export default NoAuth;
