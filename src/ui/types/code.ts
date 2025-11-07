import type { LanguageSupport, StreamLanguage } from "@codemirror/language";

export type LangFactory = () => LanguageSupport | StreamLanguage<unknown>;
