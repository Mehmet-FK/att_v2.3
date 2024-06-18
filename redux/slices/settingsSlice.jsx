import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",

  initialState: {
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
      // state.user.avatarUrl = userCred.avatarUrl;
      // state.user.roles = userCred.roles;
      // state.user.token = userCred.token;
      // state.user = userCred.userInfo;
      state.user = user;
    },
  },
});

export const { setTheme, setUser } = settingsSlice.actions;
export default settingsSlice.reducer;
