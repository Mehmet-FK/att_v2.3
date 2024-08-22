import { configureStore } from "@reduxjs/toolkit";
import attensamReducer from "../slices/attensamSlice";
import settingsReducer from "../slices/settingsSlice";
import tableUtilsReducer from "../slices/tableUtilsSlice";
import workflowReducer from "../slices/workflowSlice";
const store = configureStore({
  reducer: {
    attensam: attensamReducer,
    settings: settingsReducer,
    tableUtils: tableUtilsReducer,
    workflow: workflowReducer,
  },
});

export default store;
