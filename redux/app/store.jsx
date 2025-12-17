import { configureStore } from "@reduxjs/toolkit";
import attensamReducer from "../slices/attensamSlice";
import settingsReducer from "../slices/settingsSlice";
import tableUtilsReducer from "../slices/tableUtilsSlice";

const store = configureStore({
  reducer: {
    attensam: attensamReducer,
    settings: settingsReducer,
    tableUtils: tableUtilsReducer,
  },
});

export default store;
