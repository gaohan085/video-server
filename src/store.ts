import {
  Action,
  configureStore,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export interface CounterState {
  playSource: string;
  shouldFetch: boolean;
  currentPath: string;
}

const initialState: CounterState = {
  playSource: "",
  shouldFetch: true,
  currentPath: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setPlaySrc: (state, action: PayloadAction<string>) => {
      state.playSource = action.payload;
    },

    unSetPlaySrc: (state) => {
      state.playSource = "";
    },

    setShouldFetch: (state) => {
      state.shouldFetch = true;
    },

    unSetShouldFetch: (state) => {
      state.shouldFetch = false;
    },

    setCurrentPath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
    },

    unSetCurrentPath: (state) => {
      state.currentPath = "";
    },
  },
});

export const {
  setPlaySrc,
  unSetPlaySrc,
  setShouldFetch,
  unSetShouldFetch,
  setCurrentPath,
  unSetCurrentPath,
} = counterSlice.actions;

export function makeStore() {
  return configureStore({
    reducer: { counter: counterSlice.reducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const selectPlaySrc = (state: AppState) => state.counter.playSource;
export const selectShouldFetch = (state: AppState) => state.counter.shouldFetch;
export const selectCurrentPath = (state: AppState) => state.counter.currentPath;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export default store;
