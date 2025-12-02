import { ElectronAPIActiveCodeSnippitTypeInterface } from "@/shared/types/api/electron-active-code-snippit-type";
import { ElectronAPIActiveThemeInterface } from "@/shared/types/api/electron-active-theme";
import { ElectronAPIInterface } from "@/shared/types/api/electron-api";
import { ElectronAPIActiveSidebarTabInterface } from "@/shared/types/api/electron-api-active-sidebar-tab";
import { ElectronAPIApiUrlInterface } from "@/shared/types/api/electron-api-url";
import { ElectronAPIAuthorizationInterface } from "@/shared/types/api/electron-authorization";
import { ElectronAPIBodyBinaryInterface } from "@/shared/types/api/electron-body-binary";
import { ElectronAPIBodyFormDataInterface } from "@/shared/types/api/electron-body-form";
import { ElectronAPIBodyRawInterface } from "@/shared/types/api/electron-body-raw";
import { ElectronAPIBodyXWWWFormUrlencodedInterface } from "@/shared/types/api/electron-body-x-www-form-urlencoded";
import { ElectronAPICookiesInterface } from "@/shared/types/api/electron-cookies";
import { ElectronAPIEnvironmentsInterface } from "@/shared/types/api/electron-environments";
import { electronAPIFileSystemInterface } from "@/shared/types/api/electron-filesystem";
import { ElectronAPIFolderInterface } from "@/shared/types/api/electron-folder";
import { ElectronAPIHeadersInterface } from "@/shared/types/api/electron-headers";
import { ElectronAPIHiddenHeadersCheckInterface } from "@/shared/types/api/electron-hidden-headers-check";
import { ElectronAPIHistoryInterface } from "@/shared/types/api/electron-history";
import { ElectronAPIHttpStatusInterface } from "@/shared/types/api/electron-http-status";
import { ElectronAPIKeyboardShortcutInterface } from "@/shared/types/api/electron-keyboard-shortcuts";
import { ElectronAPIMetaShowColumnInterface } from "@/shared/types/api/electron-meta-show-column";
import { ElectronAPIParamsInterface } from "@/shared/types/api/electron-params";
import { ElectronAPIProjectsInterface } from "@/shared/types/api/electron-projects";
import { ElectronAPIRequestInterface } from "@/shared/types/api/electron-request";
import { ElectronAPIRequestMetaTabInterface } from "@/shared/types/api/electron-request-meta-tab";
import { ElectronAPIRequestOrFolderMetaInterface } from "@/shared/types/api/electron-request-or-folder-meta";
import { ElectronAPISettingsInterface } from "@/shared/types/api/electron-settings";
import { ElectronAPIShowHiddenMetaDataInterface } from "@/shared/types/api/electron-show-hidden-meta-data";
import { ElectronAPITabsInterface } from "@/shared/types/api/electron-tabs";
import { ElectronAPIThemeInterface } from "@/shared/types/api/electron-theme";

export interface ElectronResponseInterface {
  success: boolean;
  message: string;
}

export type NullableOptional<T> = {
  [K in keyof T]?: T[K] | null;
};

export type WithNullable<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] | null : T[P];
};

export interface WindowElectronAPIInterface {
  electronAPI: ElectronAPIInterface;
  electronAPIFileSystem: electronAPIFileSystemInterface;
  electronAPITheme: ElectronAPIThemeInterface;
  electronAPIActiveTheme: ElectronAPIActiveThemeInterface;
  electronAPIHttpStatus: ElectronAPIHttpStatusInterface;
  electronAPIActiveSidebarTab: ElectronAPIActiveSidebarTabInterface;
  electronAPIActiveCodeSnippitType: ElectronAPIActiveCodeSnippitTypeInterface;
  electronAPIProjects: ElectronAPIProjectsInterface;
  electronAPICookies: ElectronAPICookiesInterface;
  electronAPISettings: ElectronAPISettingsInterface;
  electronAPIEnvironments: ElectronAPIEnvironmentsInterface;
  electronAPIAuthorization: ElectronAPIAuthorizationInterface;
  electronAPIRequestOrFolderMeta: ElectronAPIRequestOrFolderMetaInterface;
  electronAPITabs: ElectronAPITabsInterface;
  electronAPIFolder: ElectronAPIFolderInterface;
  electronAPIParams: ElectronAPIParamsInterface;
  electronAPIHeaders: ElectronAPIHeadersInterface;
  electronAPIHiddenHeadersCheck: ElectronAPIHiddenHeadersCheckInterface;
  electronAPIShowHiddenMetaData: ElectronAPIShowHiddenMetaDataInterface;
  electronAPIBodyRaw: ElectronAPIBodyRawInterface;
  electronAPIBodyBinary: ElectronAPIBodyBinaryInterface;
  electronAPIRequestMetaTab: ElectronAPIRequestMetaTabInterface;
  electronAPIBodyXWWWFormUrlencoded: ElectronAPIBodyXWWWFormUrlencodedInterface;
  electronAPIBodyFormData: ElectronAPIBodyFormDataInterface;
  electronAPIMetaShowColumn: ElectronAPIMetaShowColumnInterface;
  electronAPIApiUrl: ElectronAPIApiUrlInterface;
  electronAPIRequest: ElectronAPIRequestInterface;
  electronAPIKeyboardShortcut: ElectronAPIKeyboardShortcutInterface;
  electronAPIHistory: ElectronAPIHistoryInterface;
}
