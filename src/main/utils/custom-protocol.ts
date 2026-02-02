import { net, protocol, session } from "electron";
import { pathToFileURL } from "node:url";
import path from "node:path";

/* Register custom protocol as privileged */
protocol.registerSchemesAsPrivileged([
  {
    scheme: "api-bolt",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      bypassCSP: true,
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

      /* Decode characters (like %20 for spaces) */
      relPath = decodeURIComponent(relPath);

      /**
       * FIX FOR WINDOWS: Add colon back to drive letter
       * Converts "c/Users" -> "C:/Users"
       */
      if (process.platform === "win32") {
        if (/^[a-zA-Z]\//.test(relPath)) {
          relPath = relPath[0] + ":" + relPath.slice(1);
        }
      } else {
        /**
         * Fix Linux/Mac leading slash: 'home/user' -> '/home/user'
         */
        if (!relPath.startsWith("/")) {
          relPath = "/" + relPath;
        }
      }

      /* Convert back to a proper file:// URL for net.fetch */
      const fileUrl = pathToFileURL(path.normalize(relPath)).toString();

      return net.fetch(fileUrl);
    } catch (err) {
      console.error("Error handling api-bolt protocol:", err);
      return new Response(null, { status: 404, statusText: "Not Found" });
    }
  });
};
