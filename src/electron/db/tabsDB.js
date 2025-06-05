import PouchDB from "pouchdb";
export const tabsStateDB = new PouchDB("tabsState");

const _id = "tabs_state";
const defaultTabData = {
  _id,
  openTabs: [],
  selectedTab: null,
};
/* 
{
  _id: 'tab_state',
  openTabs: ['tab1Id', 'tab2Id', 'tab3Id'],
  selectedTab: 'tab2Id',
}
*/

export const getTabList = async (_) => {
  try {
    const tabsData = await tabsStateDB.get(_id);

    if (!tabsData) {
      await createDefaultTabState();
      tabsData = defaultTabData;
    }

    return tabsData;
  } catch (error) {
    // console.log(error);
    return defaultTabData;
  }
};

export const changeTabsData = async (
  _,
  { openTabs = [], selectedTab = null }
) => {
  try {
    let tabsData = {};

    try {
      tabsData = await tabsStateDB.get(_id);
    } catch (err) {
      if (err.status === 404) {
        /* First time, no doc yet — that's okay! */
        tabsData = {};
      } else {
        throw err;
      }
    }

    await tabsStateDB.put({
      _id,
      ...tabsData,
      openTabs,
      selectedTab,
    });
  } catch (error) {
    // console.log(error);
    return defaultTabData;
  }
};

const createDefaultTabState = async () => {
  await tabsStateDB.put({
    ...defaultTabData,
  });
};
