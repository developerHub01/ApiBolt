import { app, BrowserWindow, ipcMain, session } from "electron";
import axios from "axios";
import path from "path";

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(app.getAppPath(), "src", "electron", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.maximize();

  // Load your React build
  win.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle("getCookies", async (_event, originUrl) => {
    const cookies = await session.defaultSession.cookies.get({
      url: originUrl,
    });
    return cookies.map((c) => `${c.name}=${c.value}`).join("; ");
  });

  ipcMain.handle("fetchApi", fetchApi);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const getRawContentType = (subtype) => {
  switch (subtype) {
    case "json":
      return "application/json";
    case "xml":
      return "application/xml";
    case "html":
      return "text/html";
    case "text":
      return "text/plain";
    case "javascript":
      return "application/javascript";
    default:
      return "text/plain";
  }
};

const fetchApi = async (_, payload) => {
  const {
    method,
    url,
    hiddenHeaders,
    bodyType,
    formData,
    xWWWformDataUrlencoded,
    rawData,
    binaryData,
    rawSubType,
  } = payload;

  let { headers } = payload;

  let data = null;
  headers = {
    ...headers,
    ...hiddenHeaders,
  };

  switch (bodyType) {
    case "none": {
      data = null;
      break;
    }

    case "raw": {
      headers["Content-Type"] = getRawContentType(rawSubType ?? "text");
      data = rawData;
      break;
    }

    case "form-data": {
      if (!formData) break;
      const formPayload = new FormData();
      for (const { key, value } of formData) {
        if (value instanceof File) {
          // Single file
          formPayload.append(key, value);
        } else if (Array.isArray(value) && value[0] instanceof File) {
          // Multiple files
          value.forEach((file) => formPayload.append(key, file));
        } else if (typeof value === "string") {
          // Plain string or number
          formPayload.append(key, value);
        }
      }
      data = formPayload;
      delete headers["Content-Type"];
      break;
    }

    case "x-www-form-urlencoded": {
      if (!xWWWformDataUrlencoded) break;

      const urlSearchParams = new URLSearchParams();
      xWWWformDataUrlencoded.forEach(({ key, value }) => {
        urlSearchParams.append(key, value);
      });
      data = urlSearchParams;
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      break;
    }

    case "binary": {
      headers["Content-Type"] = "application/octet-stream";
      data = binaryData;
      break;
    }

    default:
      throw new Error("Unsupported body type");
  }

  try {
    const res = await axios({
      method,
      url,
      headers,
      data,
      withCredentials: true,
      maxRedirects: 5,
    });

    console.log("response", res);
    const cookies = parseSetCookie(res.headers["set-cookie"]);
    console.log("cookies", cookies);

    return {
      headers: res.headers,
      status: res.status,
      statusText: res.statusText,
      data: res.data,
      cookies,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        data: error.response.data,
        headers: error.response.headers,
        status: error.response.status,
        statusText: error.response.statusText,
        statusDescription: "",
      };
    } else {
      return {
        data: null,
        headers: {},
        status: 0,
        statusText: "Network Error",
        statusDescription:
          "Could not connect to the server. Check your internet or API URL.",
      };
    }
  }
};

const parseCookie = (cookie) => {
  const parsedCookie = {};
  const cookieParts = cookie.split(";");

  const [nameValue, cookieValue] = cookieParts[0].split("=");
  parsedCookie.name = nameValue.trim();
  parsedCookie.value = cookieValue.trim();

  cookieParts.slice(1).forEach((part) => {
    const [key, value] = part.trim().split("=");
    switch (key.toLowerCase()) {
      case "domain":
        parsedCookie.domain = value;
        break;
      case "path":
        parsedCookie.path = value;
        break;
      case "expires":
        parsedCookie.expires = value;
        break;
      case "httponly":
        parsedCookie.HttpOnly = true;
        break;
      case "secure":
        parsedCookie.secure = true;
        break;
      case "samesite":
        parsedCookie.samesite = value;
        break;
      default:
        break;
    }
  });

  return parsedCookie;
};

const parseSetCookie = (setCookieArray) => {
  return setCookieArray.map(parseCookie);
};
