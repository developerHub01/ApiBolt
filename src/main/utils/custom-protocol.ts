import { net, protocol, session } from "electron";
import { pathToFileURL } from "node:url";
import path from "node:path";
import os from "node:os";

/* Register custom protocol as privileged */
protocol.registerSchemesAsPrivileged([
  {
    scheme: "api-bolt",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
    },
  },
]);

/**
 * Protocol handler for api-bolt:// URLs
 */
export const handleProtocol = () => {
  session.defaultSession.protocol.handle("api-bolt", async request => {
    try {
      let relPath = request.url.replace("api-bolt://", "");

      /* On Linux/Mac, ensure leading slash */
      if (!relPath.startsWith("/")) relPath = "/" + relPath;

      /* On Windows, remove leading slash if path starts with drive letter like /C:/... */
      if (os.platform() === "win32" && relPath.match(/^\/[a-zA-Z]:\//))
        relPath = relPath.slice(1);

      /* relPath is now absolute */
      const absoluteFilePath = path.resolve(relPath);
      const fileUrl = pathToFileURL(absoluteFilePath).toString();

      const response = await net.fetch(fileUrl);
      return response;
    } catch (err) {
      console.error("Error handling api-bolt protocol:", err);
      return new Response(null, { status: 404, statusText: "Not Found" });
    }
  });
};
