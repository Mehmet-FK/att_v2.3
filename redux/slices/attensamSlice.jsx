import { createSlice } from "@reduxjs/toolkit";

const attensamSlice = createSlice({
  name: "attensam",

  initialState: {
    loading: false,
    error: false,
    errorMsg: "",

    data: {
      userRoles: [],
      users: {
        totalEntries: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 25,
        entries: [],
      },
    },
  },
  reducers: {
    fetchStart: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
      if (state.error) {
        state.error = false;
      }
    },
    getSuccess: (state, { payload: { data, dataName } }) => {
      state.error = false;
      state.errorMsg = "";
      state.data[dataName] = data;
    },

    editOneObject: (state, { payload: { data, modul } }) => {
      if (modul.includes("user")) {
        const originalArray = state.data.users.entries;
        const id = data.userInfo.id;
        const tempArray = originalArray.map((u) =>
          u.userInfo.id !== id ? u : data
        );
        state.data.users.entries = tempArray;
      }
    },

    fetchFail: (state, { payload: { message } }) => {
      state.error = true;
      state.errorMsg = message;
    },

    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchStart, getSuccess, editOneObject, fetchFail, stopLoading } =
  attensamSlice.actions;
export default attensamSlice.reducer;
