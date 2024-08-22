import { createSlice } from "@reduxjs/toolkit";
/* export const dummyData = [
  {
    groupTitle: "Schädlingsbekämpfung",
    bgColor: "#e63e10",
    img: "https://einfaches-gaertnern.de/wp-content/uploads/2021/02/header-biologische-schaedlingsbekaempfung-1.jpg",
    subModules: [
      {
        name: "Feedback Management",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#ffb800",
        href: "/feedback-management",
      },
      {
        name: "Mobiler Leistungsschein",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#F9E7C0",
        href: "/mobiler-leistungsschein",
      },
      {
        name: "SB Kontrolle",
        icon: "https://cdn1.iconfinder.com/data/icons/material-core/18/bug-report-256.png",
        color: "#41B27C",
        href: "/sb-kontrolle",
      },
      
    ],
  },
];
 */
const attensamSlice = createSlice({
  name: "attensam",

  initialState: {
    loading: false,
    error: false,
    errorMsg: "",

    data: {},
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data, dataName } }) => {
      state.error = false;
      state.errorMsg = "";
      state.data[dataName] = data;
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

export const { fetchStart, getSuccess, fetchFail, stopLoading } =
  attensamSlice.actions;
export default attensamSlice.reducer;
