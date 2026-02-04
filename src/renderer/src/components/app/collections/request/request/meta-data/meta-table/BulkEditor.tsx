import { memo, useCallback, useMemo, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Code from "@/components/ui/code";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { replaceMetaTableData } from "@/context/redux/request-response/thunks/meta-table-data";
import { selectMetaBulkData } from "@/context/redux/request-response/selectors/meta-request";
import type { TParamContentType } from "@shared/types/request-response.types";
import { detectAndCleanVariable } from "@/utils/request-response.utils";

interface MetaDataInterface {
  key: string;
  value: string;
  description: string;
  isCheck: boolean;
  keyType?: TParamContentType;
  valueType?: TParamContentType;
}

const placeholder = `Rows are separated by new lines
Keys and values are separated by :
Prepend // to any row you want to add but keep disabled
Variable with {{variable}}`;

const textToMetaData = (text: string) =>
  text
    .split("\n")
    .map(line => {
      const tempLine = line.trim();

      if (tempLine && tempLine !== "//" && !tempLine.includes(":"))
        line = line.concat(":");
      if (line.startsWith(":")) line = " ".concat(line);
      if (line.endsWith(":")) line = line.concat(" ");

      return line;
    })
    .map(line => line.split(":"))
    .filter(line => {
      if (line.length <= 1) return false;
      return line;
    })
    .map(line => {
      let key = line[0].trim();
      if (key.startsWith("//")) key = key.slice(2).trim();

      let value = line[1].trimEnd();
      const description = line[2]?.trimEnd() ?? "";
      const enabled =
        !line[0].startsWith(
          "//",
        ); /* if start with // then it mean hidden so false */

      const cleanKeyVariable = detectAndCleanVariable(key, "keyType");
      key = cleanKeyVariable.key;
      const keyType = cleanKeyVariable.keyType;

      const cleanVariableVariable = detectAndCleanVariable(value, "valueType");
      value = cleanVariableVariable.value;
      const valueType = cleanVariableVariable.valueType;

      return {
        key,
        value,
        description,
        enabled,
        keyType,
        valueType,
      };
    });

const metaDataToText = (data: Array<MetaDataInterface> = []) => {
  return data
    .reduce((acc: Array<string>, curr: MetaDataInterface) => {
      const keyDetails = detectAndCleanVariable(curr.key, "keyType");
      const valueDetails = detectAndCleanVariable(curr.value, "valueType");

      const isCheck = curr.isCheck ?? true;
      let key = keyDetails.key;
      let value = valueDetails.value;
      if (curr.keyType === "env") key = `{{${keyDetails.key}}}`;
      if (curr.valueType === "env") value = `{{${valueDetails.value}}}`;

      let line = [key ?? "", value ?? "", curr.description ?? ""].join(":");
      if (!isCheck) line = "//" + line;

      return [...acc, line];
    }, [])
    .join("\n");
};

const BulkEditor = memo(() => {
  const metaData = useAppSelector(selectMetaBulkData);
  const metaDataText = useMemo(
    () => metaDataToText(metaData as Array<MetaDataInterface>),
    [metaData],
  );

  return <Editor metaDataText={metaDataText} />;
});

interface EditorProps {
  metaDataText: string;
}

const Editor = memo(({ metaDataText }: EditorProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(metaDataText);
  const [prevValue, setPrevValue] = useState<string>(metaDataText);

  const handleChange = useCallback((code: string) => setValue(code), []);

  const handleBlur = useCallback(() => {
    if (value === metaDataText) return;

    const metaArray = textToMetaData(value);
    const payload = metaArray.map(param => ({
      key: param.key as string,
      value: param.value as string,
      description: param.description as string,
      isCheck: param.enabled as boolean,
      keyType: param.keyType as TParamContentType,
      valueType: param.valueType as TParamContentType,
    }));
    dispatch(replaceMetaTableData(payload));
  }, [dispatch, value, metaDataText]);

  if (metaDataText !== prevValue) {
    setPrevValue(metaDataText);
    setValue(metaDataText);
  }

  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full relative bg-background/10 rounded-md border",
        "backdrop-blur-xs",
      )}
    >
      <Code
        code={value}
        contentType={"text"}
        onChange={handleChange}
        onBlur={handleBlur}
        zoomable={true}
        lineWrap={true}
        lineNumbers={false}
        indentWithTab={false}
        copy={false}
        className="static h-full"
        placeholder={placeholder}
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});

export default BulkEditor;
