import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleChangeFolderDescription,
  handleChangeFolderTitle,
  handleUpdateRequestResponseSelectedTab,
} from "@/context/redux/request-response/request-response-slice";

export const loadRequestData = createAsyncThunk<
  void,
  string | null,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/loadRequestData",
  async (selectedTab, { getState, dispatch }) => {
    if (!selectedTab) return;
    const state = getState() as RootState;

    const isSelectedRequestAlreadyLoaded =
      state.requestResponse.loadedRequestList[selectedTab];

    // if (selectedTab === requestResponseSelectedTab) return;
    dispatch(handleUpdateRequestResponseSelectedTab(selectedTab));

    if (!selectedTab || isSelectedRequestAlreadyLoaded) return;

    // const requestDetails =
    //   await window.electronAPIRequestAndFolderDB.findRequestOrFolderById(
    //     selectedTab
    //   );

    // if (state.requestResponse.requestList[selectedTab]?.children) {
    //   dispatch(
    //     handleInitFolder({
    //       id: selectedTab,
    //       payload: requestDetails as ResponseFolderDataInterface | undefined,
    //     })
    //   );
    // } else {
    //   dispatch(
    //     handleInitRequest({
    //       id: selectedTab,
    //       payload: requestDetails as
    //         | ResponseFileDataBackendInterface
    //         | undefined,
    //     })
    //   );
    // }
  }
);

// export const getDownloadableRequestData = createAsyncThunk<
//   ResponseFileDataInterface | null,
//   string,
//   { state: RootState }
// >("request-response/getDownloadableRequestData", async (id, { getState }) => {
//   const state = getState() as RootState;

//   if (!state.requestResponse.loadedRequestList[id]) return null;

//   const formDataWithMetadata: Array<FormDataFileMetadataInterface> =
//     await Promise.all(
//       (state.requestResponse.formData[id] ?? []).map(async (data) => {
//         let value: Array<FileMetadataInterface> | string = "";
//         if (
//           Array.isArray(data.value) &&
//           data.value.every((v) => v instanceof File)
//         ) {
//           value = await Promise.all(
//             data.value.map((file) =>
//               converterFileToMetadata(
//                 file,
//                 state.requestResponse.isDownloadRequestWithBase64[id]
//               )
//             )
//           );
//         } else if (typeof data.value === "string") {
//           value = data.value;
//         }

//         return {
//           ...data,
//           value,
//         };
//       })
//     );

//   // const authorizationData =
//   //   state.requestResponse.authType[id] === "api-key"
//   //     ? state.requestResponse.apiKeyAuth[id]
//   //     : state.requestResponse.authType[id] === "basic-auth"
//   //       ? state.requestResponse.basicAuth[id]
//   //       : state.requestResponse.authType[id] === "bearer-token"
//   //         ? state.requestResponse.bearerTokenAuth[id]
//   //         : state.requestResponse.authType[id] === "jwt-bearer"
//   //           ? state.requestResponse.jwtBearerAuth[id]
//   //           : undefined;

//   // const downloadData: ResponseFileDataInterface = {
//   //   name: state.requestResponse.requestList[id].name,
//   //   url: state.requestResponse.apiUrl[id],
//   //   method: state.requestResponse.requestList[id].method!,
//   //   params: state.requestResponse.params[id],
//   //   headers: state.requestResponse.headers[id],
//   //   // authorization: {
//   //   //   type: state.requestResponse.authType[id],
//   //   //   data: authorizationData,
//   //   // },
//   //   body: {
//   //     selected: state.requestResponse.requestBodyType[id],
//   //     rawData: state.requestResponse.rawData[id],
//   //     formData: formDataWithMetadata,
//   //     xWWWFormUrlencodedData: state.requestResponse.xWWWFormUrlencodedData[id],
//   //     binaryData:
//   //       state.requestResponse.binaryData[id] &&
//   //       (await converterFileToMetadata(
//   //         state.requestResponse.binaryData[id],
//   //         state.requestResponse.isDownloadRequestWithBase64[id]
//   //       )),
//   //     rawRequestBodyType: state.requestResponse.rawRequestBodyType[id],
//   //   },
//   //   response: state.requestResponse.response[id],
//   //   size: {
//   //     requestSize: state.requestResponse.requestSize[id],
//   //     responseSize: state.requestResponse.responseSize[id],
//   //   },
//   // };

//   return downloadData;
// });

// export const importRequestFromFile = createAsyncThunk<
//   void,
//   { file: File; selectedTab: string; cb?: (message: string) => void },
//   { dispatch: AppDispatch; state: RootState }
// >(
//   "request-response/importRequestFromFile",
//   async ({ file, selectedTab, cb }, { dispatch }) => {
//     try {
//       const text = await file.text();
//       const jsonData: ResponseFileDataInterface = JSON.parse(text);

//       if (!handleCheckImportedRequestFileValidator(jsonData))
//         throw new Error("File json is not valid");

//       const formData: Array<FormDataInterface> = jsonData.body.formData.map(
//         (data) => {
//           if (typeof data.value === "string") return data as FormDataInterface;

//           if (Array.isArray(data.value)) {
//             if (data.value.some((v) => !v.base64)) {
//               return { ...data, value: "" };
//             }

//             const files = data.value.map((file) =>
//               base64ToFileObject(file.base64!, file.fileName, file.mimeType)
//             );

//             return { ...data, value: files };
//           }

//           return { ...data, value: "" };
//         }
//       );

//       const binaryData = jsonData.body.binaryData?.base64
//         ? base64ToFileObject(
//             jsonData.body.binaryData.base64,
//             jsonData.body.binaryData.fileName,
//             jsonData.body.binaryData.mimeType
//           )
//         : null;

//       const authorizationType = jsonData.authorization.type;
//       const authorizationData = jsonData.authorization.data;

//       dispatch(
//         handleChangeRequestName({
//           id: selectedTab,
//           name: jsonData.name,
//         })
//       );
//       dispatch(
//         handleChangeSelectedMethod({
//           id: selectedTab,
//           method: jsonData.method,
//         })
//       );
//       dispatch(
//         handleSetParams({
//           id: selectedTab,
//           params: jsonData.params,
//         })
//       );
//       dispatch(
//         handleSetHeaders({
//           id: selectedTab,
//           headers: jsonData.headers,
//         })
//       );
//       dispatch(
//         handleSetResponse({
//           id: selectedTab,
//           response: jsonData.response,
//         })
//       );
//       dispatch(
//         handleSetFormData({
//           id: selectedTab,
//           formData: formData,
//         })
//       );
//       dispatch(
//         handleSetBinary({
//           id: selectedTab,
//           binary: binaryData,
//         })
//       );
//       dispatch(
//         handleChangeRawData({
//           id: selectedTab,
//           raw: jsonData.body.rawData,
//         })
//       );
//       dispatch(
//         handleChangeRequestBodyType({
//           id: selectedTab,
//           type: jsonData.body.selected,
//         })
//       );
//       dispatch(
//         handleSetXWWWFormUrlencodedData({
//           id: selectedTab,
//           xWWWFormUrlencoded: jsonData.body.xWWWFormUrlencodedData,
//         })
//       );
//       dispatch(
//         handleChangeRawRequestBodyType({
//           id: selectedTab,
//           type: jsonData.body.rawRequestBodyType,
//         })
//       );
//       dispatch(
//         handleChangeApiUrl({
//           id: selectedTab,
//           url: jsonData.url,
//         })
//       );
//       dispatch(
//         handleChangeRequestResponseSize({
//           id: selectedTab,
//           payload: jsonData.size.requestSize,
//           type: "request",
//         })
//       );
//       dispatch(
//         handleChangeRequestResponseSize({
//           id: selectedTab,
//           payload: jsonData.size.responseSize,
//           type: "response",
//         })
//       );
//       dispatch(
//         handleChangeAuthType({
//           id: selectedTab,
//           type: authorizationType,
//         })
//       );

//       switch (authorizationType as TAuthType) {
//         case "api-key":
//           dispatch(
//             handleSetAPIKey({
//               id: selectedTab,
//               value: authorizationData as APIKeyInterface,
//             })
//           );
//           break;
//         case "basic-auth":
//           dispatch(
//             handleSetBasicAuth({
//               id: selectedTab,
//               value: authorizationData as BasicAuthInterface,
//             })
//           );
//           break;
//         case "bearer-token":
//           dispatch(
//             handleChangeBearerTokenAuth({
//               id: selectedTab,
//               value: authorizationData as string,
//             })
//           );
//           break;
//         case "jwt-bearer":
//           dispatch(
//             handleSetJWTBearerAuth({
//               id: selectedTab,
//               value: authorizationData as JWTBearerAuthInterface,
//             })
//           );
//           break;
//       }

//       if (cb) cb("Successfully imported");
//     } catch {
//       if (cb) cb("Request JSON file is not valid");
//     }
//   }
// );

export const changeFolderContent = createAsyncThunk<
  void,
  { id?: string; value: string; type?: "title" | "description" },
  { state: RootState; dispatch: AppDispatch }
>(
  "request-response/changeFolderContent",
  async ({ id, value, type = "title" }, { getState, dispatch }) => {
    const state = getState() as RootState;

    const requestId = id ?? state.requestResponse.selectedTab;
    if (!requestId || !state.requestResponse.requestList[requestId].children)
      return;

    try {
      dispatch(
        type === "title"
          ? handleChangeFolderTitle({
              value,
            })
          : handleChangeFolderDescription({
              value,
            })
      );
      // await window.electronAPIRequestAndFolderDB.updateRequestOrFolderById(
      //   requestId,
      //   {
      //     title:
      //       type === "title"
      //         ? value
      //         : (state.requestResponse.folderTitle[requestId] ??
      //           defaultFolderTitle),
      //     description:
      //       type === "description"
      //         ? value
      //         : (state.requestResponse.folderDescription[requestId] ??
      //           defaultFolderDescription),
      //   }
      // );
    } catch (error) {
      console.log(error);
    }
  }
);
