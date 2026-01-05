/* order is "ctrl" | "shift" | "alt" | "meta" */

export const keyboardBindings: Record<
  string,
  {
    label: string;
    key: Array<string>;
  }
> = {
  navigate_projects: {
    label: "Navigate to projects",
    key: ["ctrl", "shift", "p"],
  },
  navigate_collections: {
    label: "Navigate to collections",
    key: ["ctrl", "shift", "c"],
  },
  navigate_environments: {
    label: "Navigate to environments",
    key: ["ctrl", "shift", "e"],
  },
  navigate_authorization: {
    label: "Navigate to authorization",
    key: ["ctrl", "shift", "a"],
  },
  navigate_themes_marketplace: {
    label: "Navigate to theme marketplace",
    key: ["ctrl", "shift", "m"],
  },
  navigate_themes_editor: {
    label: "Navigate to theme editor",
    key: ["ctrl", "shift", "t"],
  },
  toggle_activitybar: {
    label: "Toggle activitybar",
    key: ["meta", "a"],
  },
  toggle_sidebar: {
    label: "Toggle sidebar",
    key: ["ctrl", "b"],
  },
  toggle_fullscreen: {
    label: "Toggle fullscreen",
    key: ["f11"],
  },
  open_cookies: {
    label: "Open Cookies",
    key: ["ctrl", "alt", "c"],
  },
  open_keyboard_shortcut: {
    label: "Open keyboard shortcut",
    key: ["ctrl", "alt", "k"],
  },
  open_settings: {
    label: "Open Settings",
    key: ["ctrl", ","],
  },
  navigate_local_password: {
    label: "Open Local Password",
    key: ["ctrl", "alt", "p"],
  },
  /***
   * =============================
   * Tabs start
   * =============================
   * ***/
  /* open =================== */
  open_tab: {
    label: "Open Tab",
    key: ["ctrl", "t"],
  },
  open_left_tab: {
    label: "Open Left Tab",
    key: ["ctrl", "shift", "l"],
  },
  open_right_tab: {
    label: "Open Right Tab",
    key: ["ctrl", "shift", "r"],
  },
  /* close =================== */
  close_tab: {
    label: "Close Current Tab",
    key: ["ctrl", "f4"],
  },
  close_all_tabs: {
    label: "Close All Tabs",
    key: ["ctrl", "alt", "a"],
  },
  close_other_tabs: {
    label: "Close Others Tabs",
    key: ["ctrl", "alt", "o"],
  },
  close_left_tabs: {
    label: "Close Left Tabs",
    key: ["ctrl", "alt", "q"],
  },
  close_right_tabs: {
    label: "Close Right Tabs",
    key: ["ctrl", "alt", "e"],
  },
  /* switch =================== */
  switch_left_tab: {
    label: "Switch Left Tabs",
    key: ["ctrl", "shift", "tab"],
  },
  switch_right_tab: {
    label: "Switch Right Tab",
    key: ["ctrl", "tab"],
  },
  /* lock/unlock =================== */
  lock_tab: {
    label: "Lock/unlock Tabs List",
    key: ["ctrl", "meta", "l"],
  },
  /***
   * =============================
   * Tabs end
   * =============================
   * ***/
  search_collection: {
    label: "Search collection",
    key: ["ctrl", "k"],
  },
  code_line_wrap: {
    label: "Code line wrap",
    key: ["alt", "z"],
  },
  code_beautify: {
    label: "Code beautify",
    key: ["shift", "alt", "f"],
  },
  toggle_response_panel: {
    label: "Toggle Response",
    key: ["ctrl", "`"],
  },
  zoom_in: {
    label: "Zoom in",
    key: ["ctrl", "+"],
  },
  zoom_out: {
    label: "Zoom out",
    key: ["ctrl", "-"],
  },
  zoom_reset: {
    label: "Zoom reset",
    key: ["ctrl", "0"],
  },
  code_zoom_in: {
    label: "Code zoom in",
    key: ["ctrl", "+"],
  },
  code_zoom_out: {
    label: "Code zoom out",
    key: ["ctrl", "-"],
  },
  code_zoom_reset: {
    label: "Code zoom reset",
    key: ["ctrl", "0"],
  },
};
