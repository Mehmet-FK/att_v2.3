import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",

  initialState: {
    sessionExpired: false,
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
  },
});

export const { setTheme, setUser, setSessionExpired } = settingsSlice.actions;
export default settingsSlice.reducer;
