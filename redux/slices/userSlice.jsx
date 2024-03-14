import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userInfo",

  initialState: {
    token: null,

    darkMode: "light",
  },
  reducers: {
    setTheme: (state, { payload: { mode } }) => {
      state.darkMode = mode;
    },
    setUser: (state, { payload: { user } }) => {
      state.token = user?.token;
    },
  },
});

export const { setTheme, setUser } = userSlice.actions;
export default userSlice.reducer;
