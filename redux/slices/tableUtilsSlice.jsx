import { createSlice } from "@reduxjs/toolkit";

const tableUtilsSlice = createSlice({
  name: "tableUtils",

  initialState: {
    tableTemplate: {
      searchTrigger: false,
      columnWidths: {},
      filterParams: "",
      sortingParams: {},
      sortingParamsString: "",
      paginationParamsString: "",
      paginationParams: {
        pageSize: 25,
        currentPage: 1,
        totalPages: 1,
      },
    },
  },
  reducers: {
    initTableState: (state, { payload: { table } }) => {
      state[table] = state[table] ? state[table] : state.tableTemplate;
    },
    setColumnWidths: (state, { payload: { table, widths } }) => {
      state[table].columnWidths = widths;
    },

    setFilterParams: (state, { payload: { params, table } }) => {
      state[table].filterParams = params;
    },
    setSortType: (state, { payload: { field, table } }) => {
      state[table].sortingParams = {
        ...field,
      };
    },
    setSearchTrigger: (state, { payload: { table } }) => {
      state[table].searchTrigger = !state[table].searchTrigger;
    },
    makeSortParamsString: (state, { payload: { str, table } }) => {
      state[table].sortingParamsString = str;
    },
    setPageSize: (state, { payload: { size, table } }) => {
      state[table].paginationParams.pageSize = size;
    },
    setCurrentPage: (state, { payload: { number, table } }) => {
      state[table].paginationParams.currentPage = number;
    },
    setTotalPages: (state, { payload: { total, table } }) => {
      state[table].paginationParams.totalPages = total;
    },
    makePaginationParamsString: (state, { payload: { str, table } }) => {
      state[table].paginationParamsString = str;
    },
  },
});

export const {
  initTableState,
  setSearchTrigger,
  setFilterParams,
  setSortType,
  makeSortParamsString,
  setCurrentPage,
  setTotalPages,
  setPageSize,
  setColumnWidths,
  makePaginationParamsString,
} = tableUtilsSlice.actions;
export default tableUtilsSlice.reducer;
