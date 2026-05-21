import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { protocolUrlOpenTheme } from "@/context/redux/theme-marketplace/thunks/theme-marketplace";

const ProtocolUrlExecutor = () => {
  const dispatch = useAppDispatch();

  const handleChangeSelectedTheme = useCallback(
    (themeId: string) => {
      dispatch(protocolUrlOpenTheme(themeId));
    },
    [dispatch],
  );

  useEffect(() => {
    const cleanup = window.electronAPI.onDeepLink(url => {
      try {
        const parsed = new URL(url);
        const host = parsed.host;

        switch (host) {
          case "theme": {
            const themeId = parsed.pathname.replaceAll("/", "");
            if (!themeId) return;
            handleChangeSelectedTheme(themeId);
            return;
          }
        }
      } catch (error) {
        console.error(error);
      }
    });

    return cleanup;
  }, [handleChangeSelectedTheme]);

  return null;
};

export default ProtocolUrlExecutor;
