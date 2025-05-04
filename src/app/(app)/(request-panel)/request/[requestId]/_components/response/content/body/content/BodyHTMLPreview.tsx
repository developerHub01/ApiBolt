import React from "react";

interface BodyHTMLPreviewProps {
  data: string;
}

const BodyHTMLPreview = ({ data }: BodyHTMLPreviewProps) => {
  // Basic CSS to force light mode in iframe
  const iframeStyles = `
   body {
     background-color: white !important;
     color: black !important;
   }
   * {
     background-color: inherit !important;
     color: inherit !important;
   }
 `;

  // Inject styles into iframe content
  const htmlContent = `
   <html>
     <head>
       <style>
         ${iframeStyles}
       </style>
     </head>
     <body>
       ${data}
     </body>
   </html>
 `;

  return (
    <div className="w-full h-full">
      <iframe
        srcDoc={htmlContent}
        style={{ width: "100%", height: "100%", border: "none" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default BodyHTMLPreview;
