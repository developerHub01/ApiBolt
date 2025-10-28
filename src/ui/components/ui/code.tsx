import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import CodeMirror from "@uiw/react-codemirror";
import type { Extension } from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import useMounted from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { Copy as CopyIcon } from "lucide-react";
import type { TContentType } from "@/types/request-response.types";
import { toast } from "sonner";
import { langs } from "@uiw/codemirror-extensions-langs";
import { langMap } from "@/constant/code.constant";
import useCodeKeybaordShortcut from "@/hooks/code/use-code-keybaord-shortcut";

export type TLanguageType =
  | TContentType
  | "markdown"
  | "java"
  | "go"
  | "php"
  | "python"
  | "java";

const fontSizeLimit = {
  max: 40,
  min: 5,
};

const getEditableOptions = ({
  editable,
  onChange,
  onBlur,
  lineNumbers,
  foldLine,
  autoFocus,
}: {
  editable: boolean;
  onChange?: (code: string) => void;
  onBlur?: () => void;
  lineNumbers: boolean;
  foldLine: boolean;
  autoFocus: boolean;
}) => {
  if (!editable) return {};

  return {
    autoFocus,
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
  contentType: TLanguageType | string;
  fontSize?: number;
  code: string;
  onChange?: (code: string) => void;
  onBlur?: () => void;
  transparentBg?: boolean;
  editable?: boolean;
  className?: string;
  innerClassName?: string;
  zoomable?: boolean;
  lineWrap?: boolean;
  lineNumbers?: boolean;
  foldLine?: boolean;
  indentWithTab?: boolean;
  copy?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  handleFormat?: () => void;
  handleLineWrap?: () => void;
  beforeComp?: JSX.Element | null;
  [key: string]: unknown;
}

const Code = ({
  contentType,
  fontSize = 16,
  code = "",
  onChange,
  onBlur,
  transparentBg = true,
  editable = true,
  className = "",
  innerClassName = "",
  zoomable = false,
  lineWrap = false,
  lineNumbers = true,
  foldLine = true,
  indentWithTab = true,
  copy = true,
  autoFocus = true,
  placeholder = "",
  handleFormat,
  handleLineWrap,
  beforeComp = null,
  ...props
}: CodeProps) => {
  const [fontSizeState, setFontSizeState] = useState(fontSize);
  const { resolvedTheme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMounted = useMounted();
  const handleKeyDown = useCodeKeybaordShortcut({
    handleLineWrap,
    handleFormat,
  });

  const extensions: Array<Extension> = [
    langs[langMap?.[contentType] ?? contentType ?? "text"](),
  ];
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
            return setFontSizeState((prev) =>
              Math.min(prev + 1, fontSizeLimit.max)
            );
          case "-":
            return setFontSizeState((prev) =>
              Math.max(prev - 1, fontSizeLimit.min)
            );
        }
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
  }, [zoomable, fontSize]);

  const handleCopy = useCallback(async () => {
    try {
      const cleanCode =
        typeof code === "object" ? JSON.stringify(code) : String(code).trim();
      await navigator.clipboard.writeText(cleanCode);

      toast("Code copied", {
        description: "Successfully copied code into your clipboard",
      });
    } catch (error) {
      toast("Something went wrong", {
        description:
          "Couldn't copy. facing some issue. " +
          (error instanceof Error ? error.message : ""),
      });
    }
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
      className={cn(
        "w-full h-full relative flex flex-col focus:outline-0",
        className
      )}
      tabIndex={0}
      ref={wrapperRef}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {copy && (
        <Button
          size={"iconSm"}
          variant={"outline"}
          className="absolute top-1.5 right-1.5 z-10"
          onClick={handleCopy}
        >
          <CopyIcon />
        </Button>
      )}
      {beforeComp}
      <style>{` 
        .cm-gutter.cm-lineNumbers {
            user-select: none;
        }
      `}</style>
      <CodeMirror
        className={cn(
          "w-full h-full flex-1",
          "[&_.cm-scroller]:leading-loose!",
          {
            "[&>div]:bg-background!": !transparentBg,
            "[&>div]:bg-transparent!": transparentBg,
          },
          innerClassName
        )}
        height="100%"
        width="100%"
        theme={theme}
        style={{
          fontSize: fontSizeState,
        }}
        value={code}
        placeholder={placeholder}
        indentWithTab={indentWithTab}
        extensions={extensions}
        {...getEditableOptions({
          editable,
          onChange,
          onBlur,
          lineNumbers,
          foldLine,
          autoFocus,
        })}
        readOnly={!editable}
      />
    </div>
  );
};

export default Code;
