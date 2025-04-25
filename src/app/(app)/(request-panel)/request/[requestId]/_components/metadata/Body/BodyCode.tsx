"use client";

import React, { useCallback, useEffect, useState } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { useRequestBody } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { useTheme } from "next-themes";

const SelectedLang = (lang: string) => {
  switch (lang) {
    case "javascript":
      return javascript();
    case "json":
      return json();
    case "html":
      return html();
    case "xml":
      return xml();
    default:
      return [];
  }
};

const BodyCode = () => {
  const {
    rawData = "",
    rawRequestBodyType,
    handleChangeRawData,
  } = useRequestBody();
  const [code, setCode] = useState<string>(rawData);
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme as "dark" | "light";

  useEffect(() => {
    setCode(rawData);
  }, [rawData]);

  const handleChange = useCallback((value: string) => setCode(value), []);
  const handleBlur = useCallback(() => handleChangeRawData(code), [code]);

  return (
    <div className="w-full h-full border rounded-md overflow-hidden">
      <CodeMirror
        className="w-full h-full [&>div]:bg-background!"
        height="100%"
        theme={theme}
        style={{
          fontSize: 14,
        }}
        extensions={[SelectedLang(rawRequestBodyType)]}
        autoFocus={true}
        basicSetup={{
          autocompletion: true,
          bracketMatching: true,
          closeBrackets: true,
        }}
        value={code}
        onChange={(value: string, _viewUpdate: ViewUpdate) =>
          handleChange(value)
        }
        onBlur={handleBlur}
      />
    </div>
  );
};

export default BodyCode;
