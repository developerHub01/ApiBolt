import { useCallback, useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import type { Extension } from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import useMounted from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { Copy as CopyIcon } from "lucide-react";
import type { TContentType } from "@/types";

type TLanguageType = TContentType | "markdown";

const fontSizeLimit = {
  max: 40,
  min: 5,
};

const selectedLang = (lang: TLanguageType) => {
  switch (lang) {
    case "javascript":
      return javascript();
    case "json":
      return json();
    case "html":
      return html();
    case "xml":
      return xml();
    case "markdown":
      return markdown({ base: markdownLanguage, codeLanguages: languages });
    default:
      return [];
  }
};

const getEditableOptions = ({
  editable,
  onChange,
  onBlur,
  lineNumbers,
  foldLine,
}: {
  editable: boolean;
  onChange?: (code: string) => void;
  onBlur?: () => void;
  lineNumbers: boolean;
  foldLine: boolean;
}) => {
  if (!editable) return {};

  return {
    autoFocus: true,
    basicSetup: {
      autocompletion: true,
      bracketMatching: true,
      closeBrackets: true,
      lineNumbers,
      foldGutter: foldLine,
    },
    onChange: (value: string) => {
      if (onChange) onChange(value);
    },
    onBlur: () => {
      if (onBlur) onBlur();
    },
  };
};

interface CodeProps {
  contentType: TLanguageType;
  fontSize?: number;
  code: string;
  onChange?: (code: string) => void;
  onBlur?: () => void;
  editable?: boolean;
  className?: string;
  innerClassName?: string;
  zoomable?: boolean;
  lineWrap?: boolean;
  lineNumbers?: boolean;
  foldLine?: boolean;
  copy?: boolean;
  [key: string]: unknown;
  handleFormat?: () => void;
}

const Code = ({
  contentType,
  fontSize = 14,
  code,
  onChange,
  onBlur,
  editable = true,
  className = "",
  innerClassName = "",
  zoomable = false,
  lineWrap = false,
  lineNumbers = true,
  foldLine = true,
  copy = true,
  handleFormat,
  ...props
}: CodeProps) => {
  const [fontSizeState, setFontSizeState] = useState(fontSize);
  const { resolvedTheme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMounted = useMounted();

  const extensions: Array<Extension> = [selectedLang(contentType)];
  if (lineWrap) extensions.push(EditorView.lineWrapping);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!zoomable || !wrapper) return;

    const handleKeydownEvent = (e: globalThis.KeyboardEvent) => {
      if (e.ctrlKey) {
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
      }
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        if (handleFormat) handleFormat();
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

    wrapper.addEventListener("keydown", handleKeydownEvent);
    wrapper.addEventListener("wheel", handleWheellEvent);

    return () => {
      wrapper.removeEventListener("keydown", handleKeydownEvent);
      wrapper.removeEventListener("wheel", handleWheellEvent);
    };
  }, [zoomable, fontSize, handleFormat]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(
      typeof code === "string" ? code : JSON.stringify(code)
    );
  }, [code]);

  if (!isMounted) return null;

  const theme = [
    "light",
    "forest-light",
    "ice-wave",
    "violet-blaze",
    "white-smoke",
  ].includes(resolvedTheme ?? "")
    ? "light"
    : "dark";

  return (
    <div
      className={cn("w-full h-full relative", className)}
      tabIndex={0}
      ref={wrapperRef}
      {...props}
    >
      {copy && (
        <Button
          size={"iconSm"}
          variant={"outline"}
          className="absolute top-1.5 right-1.5 z-50"
          onClick={handleCopy}
        >
          <CopyIcon />
        </Button>
      )}
      <CodeMirror
        className={cn("w-full h-full [&>div]:bg-background!", innerClassName)}
        height="100%"
        theme={theme}
        style={{
          fontSize: fontSizeState,
        }}
        value={code}
        extensions={extensions}
        {...getEditableOptions({
          editable,
          onChange,
          onBlur,
          lineNumbers,
          foldLine,
        })}
        readOnly={!editable}
      />
    </div>
  );
};

export default Code;
