import React from "react";

interface BodyHTMLPreviewProps {
  data: string;
}

const BodyHTMLPreview = ({ data }: BodyHTMLPreviewProps) => {
  return (
    <div className="w-full h-full bg-white">
      <iframe
        srcDoc={data}
        style={{ width: "100%", height: "100%", border: "none" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default BodyHTMLPreview;
