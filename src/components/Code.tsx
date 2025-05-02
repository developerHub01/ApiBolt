"use client";

import React, { FocusEvent, useEffect, useRef, useState } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { useTheme } from "next-themes";
import { TContentType } from "@/types";
import { cn } from "@/lib/utils";

const fontSizeLimit = {
  max: 40,
  min: 5,
};

const selectedLang = (lang: string) => {
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
  zoomable?: boolean;
  lineWrap?: boolean;
}

const Code = ({
  contentType,
  fontSize = 14,
  code,
  onChange,
  onBlur,
  editable = true,
  className = "",
  zoomable = false,
  lineWrap = false,
}: CodeProps) => {
  const [fontSizeState, setFontSizeState] = useState(fontSize);
  const { resolvedTheme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const extensions: Array<any> = [selectedLang(contentType)];
  if (lineWrap) extensions.push(EditorView.lineWrapping);

  const theme = resolvedTheme as "dark" | "light";

  useEffect(() => {
    if (!zoomable || !wrapperRef.current) return;

    const handleKeydownEvent = (e: globalThis.KeyboardEvent) => {
      if (!e.ctrlKey) return;

      switch (e.key.toLowerCase()) {
        case "0":
          return setFontSizeState(fontSize);
        case "+":
        case "=":
          return setFontSizeState((prev) =>
            Math.min(prev + 1, fontSizeLimit.max)
          );
        case "-":
          return setFontSizeState((prev) =>
            Math.max(prev - 1, fontSizeLimit.min)
          );
      }
    };
    const handleWheellEvent = (e: globalThis.WheelEvent) => {
      if (!e.ctrlKey) return;

      if (e.deltaY < 0)
        return setFontSizeState((prev) =>
          Math.min(prev + 1, fontSizeLimit.max)
        );
      else
        return setFontSizeState((prev) =>
          Math.max(prev - 1, fontSizeLimit.min)
        );
    };

    wrapperRef.current.addEventListener("keydown", handleKeydownEvent);
    wrapperRef.current.addEventListener("wheel", handleWheellEvent);

    return () => {
      wrapperRef.current?.removeEventListener("keydown", handleKeydownEvent);
      wrapperRef.current?.removeEventListener("wheel", handleWheellEvent);
    };
  }, []);

  getEditableOptions(editable);
  return (
    <div className="w-full h-full" tabIndex={0} ref={wrapperRef}>
      <CodeMirror
        className={cn("w-full h-full [&>div]:bg-background!", className)}
        height="100%"
        theme={theme}
        style={{
          fontSize: fontSizeState,
        }}
        value={code}
        extensions={extensions}
        {...getEditableOptions(editable, onChange, onBlur)}
        readOnly={!editable}
      />
    </div>
  );
};

export default Code;
