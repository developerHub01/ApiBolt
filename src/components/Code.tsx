"use client";

import React, { FocusEvent } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { useTheme } from "next-themes";
import { TContentType } from "@/types";
import { cn } from "@/lib/utils";

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

const getEditableOptions = (
  editable: boolean,
  onChange?: (code: string) => void,
  onBlur?: () => void
) => {
  if (!editable) return {};

  return {
    autoFocus: true,
    basicSetup: {
      autocompletion: true,
      bracketMatching: true,
      closeBrackets: true,
    },
    onChange: (value: string, _viewUpdate: ViewUpdate) => {
      if (onChange) onChange(value);
    },
    onBlur: (e: FocusEvent<HTMLDivElement>) => {
      if (onBlur) onBlur();
    },
  };
};

interface CodeProps {
  contentType: TContentType;
  fontSize?: number;
  code: string;
  onChange?: (code: string) => void;
  onBlur?: () => void;
  editable?: boolean;
  className?: string;
}

const Code = ({
  contentType,
  fontSize = 14,
  code,
  onChange,
  onBlur,
  editable = true,
  className = "",
}: CodeProps) => {
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme as "dark" | "light";

  getEditableOptions(editable);
  return (
    <CodeMirror
      className={cn("w-full h-full [&>div]:bg-background!", className)}
      height="100%"
      theme={theme}
      style={{
        fontSize,
      }}
      value={code}
      extensions={[SelectedLang(contentType)]}
      {...getEditableOptions(editable, onChange, onBlur)}
      readOnly={!editable}
    />
  );
};

export default Code;
