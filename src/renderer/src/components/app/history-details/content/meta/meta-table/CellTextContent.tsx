interface Props {
  children: React.ReactNode;
}

const CellTextContent = ({ children }: Props) => {
  return (
    <p className="w-full whitespace-normal wrap-break-word text-sm leading-relaxed select-text">
      {children}
    </p>
  );
};

export default CellTextContent;
