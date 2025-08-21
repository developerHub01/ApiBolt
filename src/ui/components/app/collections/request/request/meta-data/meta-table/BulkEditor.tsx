import { memo, useCallback, useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Code from "@/components/ui/code";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/context/redux/hooks";
import { selectMetaBulkData } from "@/context/redux/request-response/request-response-selector";

interface MetaDataInterface {
  key: string;
  value: string;
  description: string;
  isCheck: boolean;
}

const placeholder = `Rows are separated by new lines
Keys and values are separated by :
Prepend // to any row you want to add but keep disabled`;

const textToMetaData = (text: string) =>
  text
    .split("\n")
    .map((line) => {
      const tempLine = line.trim();

      if (tempLine && tempLine !== "//" && !tempLine.includes(":"))
        line = line.concat(":");
      if (line.startsWith(":")) line = " ".concat(line);
      if (line.endsWith(":")) line = line.concat(" ");

      return line;
    })
    .map((line) => line.split(":"))
    .filter((line) => {
      if (line.length <= 1) return false;
      return line;
    })
    .map((line) => {
      let key = line[0].trim();
      if (key.startsWith("//")) key = key.slice(2).trim();

      const value = line[1].trimEnd();
      const description = line[2]?.trimEnd() ?? "";
      const enabled =
        !line[0].startsWith(
          "//"
        ); /* if start with // then it mean hidden so false */

      return [key, value, description, enabled];
    });

const metaDataToText = (data: Array<MetaDataInterface>) => {
  return data
    .reduce((acc: Array<string>, curr: MetaDataInterface) => {
      const isCheck = curr.isCheck ?? true;
      let line = [
        curr.key ?? "",
        curr.value ?? "",
        curr.description ?? "",
      ].join(":");
      if (!isCheck) line = "//" + line;

      return [...acc, line];
    }, [])
    .join("\n");
};

const BulkEditor = memo(() => {
  const [value, setValue] = useState<string>("");
  const metaData = useAppSelector(selectMetaBulkData);

  const handleChange = useCallback((code: string) => {
    setValue(code);
  }, []);

  const handleBlur = useCallback(() => {
    console.log(textToMetaData(value));
  }, [value]);

  useEffect(() => {
    setValue(metaDataToText(metaData as Array<MetaDataInterface>));
  }, [metaData]);

  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full relative bg-background/10 rounded-md border",
        "backdrop-blur-xs"
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
