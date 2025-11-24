import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import { v4 as uuidv4 } from "uuid";
import { handleLoadEnvironmentsList } from "@/context/redux/environments/environments-slice";
import type {
  EnvironmentInterface,
  EnvironmentPayloadInterface,
} from "@/types/environment.types";

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
      (await window.electronAPIEnvironmentsDB.getEnvironments()) ?? []
    ).reduce(
      (acc, curr) => {
        acc[curr.id] = {
          ...curr,
          isCheck: Boolean(Number(curr.isCheck)),
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
      id: uuidv4(),
    };
    const response = await window.electronAPIEnvironmentsDB.createEnvironments({
      ...payload,
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
    const response = await window.electronAPIEnvironmentsDB.updateEnvironments({
      id,
      ...payload,
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
      await window.electronAPIEnvironmentsDB.deleteAllEnvironments();

    // update the environment list after deletion
    if (response) dispatch(loadEnvironmentsList());
    return response;
  } catch (error) {
    console.error(error);
    return false;
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
      await window.electronAPIEnvironmentsDB.deleteEnvironments(id);

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
