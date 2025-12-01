import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",

  initialState: {
    sessionExpired: false,
    selectedEnvironment: "pro.attensam.at",
    user: {
      userId: null,
      firstname: "",
      lastname: "",
      number: "",
      isAdministrator: false,
    },
  },
  reducers: {
    setTheme: (state, { payload: { mode } }) => {
      state.darkMode = mode;
    },
    setUser: (state, { payload: { user } }) => {
      state.user = user;
    },
    setSessionExpired: (state, { payload: { isSessionExpired } }) => {
      state.sessionExpired = isSessionExpired;
    },
    setSelectedEnvironment: (state, { payload: { environment } }) => {
      state.selectedEnvironment = environment;
    },
  },
});

export const { setTheme, setUser, setSessionExpired, setSelectedEnvironment } =
  settingsSlice.actions;
export default settingsSlice.reducer;
