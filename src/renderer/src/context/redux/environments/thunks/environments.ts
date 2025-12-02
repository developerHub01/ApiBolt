import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { v4 as uuidv4 } from "uuid";
import { handleLoadEnvironmentsList } from "@/context/redux/environments/environments-slice";
import type {
  EnvironmentInterface,
  EnvironmentPayloadInterface
} from "@shared/types/environment.types";
import type { ElectronResponseInterface } from "@/types";

/* ==============================
===== Environment start =========
================================= */
export const loadEnvironmentsList = createAsyncThunk<
  Record<string, EnvironmentInterface>,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("environments/loadEnvironmentsList", async (_, { dispatch }) => {
  try {
    const list = (
      (await window.electronAPIEnvironments.getEnvironments()) ?? []
    ).reduce(
      (acc, curr) => {
        acc[curr.id] = {
          ...curr,
          isCheck: Boolean(Number(curr.isCheck))
        };
        return acc;
      },
      {} as Record<string, EnvironmentInterface>
    );

    dispatch(handleLoadEnvironmentsList(list));
    return list;
  } catch {
    return {};
  }
});

export const createEnvironments = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("environments/createEnvironments", async (_, { dispatch }) => {
  try {
    const payload = {
      id: uuidv4()
    };
    const response = await window.electronAPIEnvironments.createEnvironments({
      ...payload
    });

    if (response) dispatch(loadEnvironmentsList());
    return response;
  } catch (error) {
    console.error("Error creating environment:", error);
    return false;
  }
});

export const updateEnvironments = createAsyncThunk<
  boolean,
  {
    id: string;
    payload: Partial<EnvironmentPayloadInterface>;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("environments/updateEnvironments", async ({ id, payload }, { dispatch }) => {
  try {
    const response = await window.electronAPIEnvironments.updateEnvironments({
      id,
      ...payload
    });

    if (response) dispatch(loadEnvironmentsList());
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const deleteAllEnvironments = createAsyncThunk<
  boolean,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("environments/deleteAllEnvironments", async (_, { dispatch }) => {
  try {
    const response =
      await window.electronAPIEnvironments.deleteAllEnvironments();

    // update the environment list after deletion
    if (response) dispatch(loadEnvironmentsList());
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});

export const exportEnvironments = createAsyncThunk<
  ElectronResponseInterface,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("environments/exportEnvironments", async (_, { dispatch }) => {
  try {
    const response = await window.electronAPIEnvironments.exportEnvironments();

    // update the environment list after deletion
    if (response?.success) dispatch(loadEnvironmentsList());
    return response;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while exporting list."
    };
  }
});

export const importEnvironments = createAsyncThunk<
  ElectronResponseInterface,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("environments/importEnvironments", async (_, { dispatch }) => {
  try {
    const response = await window.electronAPIEnvironments.importEnvironments();

    // update the environment list after deletion
    if (response?.success) dispatch(loadEnvironmentsList());
    return response;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while exporting list."
    };
  }
});

export const deleteEnvironments = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("environments/deleteEnvironments", async (id, { dispatch }) => {
  try {
    const response =
      await window.electronAPIEnvironments.deleteEnvironments(id);

    // update the environment list after deletion
    if (response) dispatch(loadEnvironmentsList());
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
});
/* ==============================
===== Environment end =========
================================= */
