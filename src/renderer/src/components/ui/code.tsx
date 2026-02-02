import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import CodeMirror, { EditorState } from "@uiw/react-codemirror";
import type { Extension } from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { cn } from "@/lib/utils";
import useMounted from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { Copy as CopyIcon } from "lucide-react";
import type { TContentType } from "@shared/types/request-response.types";
import useCodeKeybaordShortcut from "@/hooks/code/use-code-keybaord-shortcut";
import useCheckApplyingCodeFontSize from "@/hooks/setting/use-check-applying-code-font-size";
import useCheckApplyingCodeIndentationSize from "@/hooks/setting/use-check-applying-code-indentation-size";
import { indentUnit } from "@codemirror/language";
import useCustomToast from "@/hooks/ui/use-custom-toast";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveThemeType } from "@/context/redux/theme/selectors/theme";
import { langMap } from "@/constant/code.constant";
import type { LangFactory } from "@shared/types/code";
import { langs } from "@uiw/codemirror-extensions-langs";

export type TLanguageType =
  | TContentType
  | "markdown"
  | "java"
  | "go"
  | "php"
  | "python"
  | "java";

/**
 * Returns the language factory for a given content type
 */
export const getLangExtension = (contentType: string): LangFactory => {
  const key = (langMap?.[contentType] ??
    contentType ??
    "text") as keyof typeof langs;
  return langs[key] || (() => []);
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
  const toast = useCustomToast();
  const fontSize = useCheckApplyingCodeFontSize();
  const indentationSize = useCheckApplyingCodeIndentationSize();
  const [fontSizeState, setFontSizeState] = useState(fontSize);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMounted = useMounted();
  const themeType = useAppSelector(selectActiveThemeType);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setFontSizeState(fontSize), [fontSize]);

  const extensions: Array<Extension> = [
    getLangExtension(contentType)(),
    EditorState.tabSize.of(indentationSize),
    indentUnit.of(" ".repeat(indentationSize)),
  ];
  if (lineWrap) extensions.push(EditorView.lineWrapping);

  const handleKeyDown = useCodeKeybaordShortcut({
    handleLineWrap,
    handleFormat,
    fontSize,
    handleFontSize: zoomable ? setFontSizeState : undefined,
  });

  const handleCopy = useCallback(async () => {
    try {
      const cleanCode =
        typeof code === "object" ? JSON.stringify(code) : String(code).trim();
      await navigator.clipboard.writeText(cleanCode);
      toast({
        type: "success",
        title: "Copied success",
        description: "Code copied to clipboard",
      });
    } catch (error) {
      toast({
        type: "error",
        title: "Copy error",
        description:
          "Failed to copy code. " +
          (error instanceof Error ? error.message : "Please try again."),
      });
    }
  }, [code, toast]);

  if (!isMounted) return null;

  const theme = themeType !== "custom" ? themeType : "dark";

  return (
    <div
      className={cn(
        "w-full h-full relative flex flex-col focus:outline-0",
        className,
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
        .cm-gutter.cm-lineNumbers,
        .cm-gutter.cm-foldGutter {
            user-select: none;
        }
        .cm-gutters.cm-gutters-before {
          background: var(--line)
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
          innerClassName,
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
