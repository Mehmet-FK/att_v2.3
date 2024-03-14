import { configureStore } from "@reduxjs/toolkit";
import attensamReducer from "../slices/attensamSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    attensam: attensamReducer,
    userInfo: userReducer,
  },
});

export default store;
