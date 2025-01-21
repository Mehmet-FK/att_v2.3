import { configureStore } from "@reduxjs/toolkit";
import attensamReducer from "../slices/attensamSlice";
import settingsReducer from "../slices/settingsSlice";
import tableUtilsReducer from "../slices/tableUtilsSlice";
import workflowReducer from "../slices/workflowSlice";
import entityReducer from "../slices/entitySlice";
const store = configureStore({
  reducer: {
    attensam: attensamReducer,
    settings: settingsReducer,
    tableUtils: tableUtilsReducer,
    workflow: workflowReducer,
    entity: entityReducer,
  },
});

export default store;
