import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  stopLoading,
} from "@/redux/slices/attensamSlice";
import { toastErrorNotify, toastSuccessNotify } from "@/helpers/ToastNotify";

const useTableDataCalls = () => {
  const dispatch = useDispatch();
  const { axiosTableData } = useAxios();

  //!--------------- GET CALL --------------
  const getAtinaData = async (url, dataName) => {
    dispatch(fetchStart());

    let res = null;
    let error = null;
    try {
      const { data } = await axiosTableData.get(url);
      dispatch(getSuccess({ data, dataName }));

      res = data;
    } catch (err) {
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      const { message } = err;
      dispatch(fetchFail({ message }));
      console.log(err);
      console.log(message);
      error = err;
    } finally {
      setTimeout(() => {
        dispatch(stopLoading());
      }, 150);
    }
    return { error, res };
  };

  //* BOOKINGS

  const getBookingTypes = () =>
    getAtinaData("api/AtinaMasterData/GetBookingTypes", "bookingTypes");

  const getMobileBookingsData = (params = "") => {
    getAtinaData(
      "api/AtinaMobileBookings?showPagination=true&" + params,
      "bookings"
    );
  };

  //* ITEMS

  const getAtinaItemsData = (params = "", type = "Order") =>
    getAtinaData(
      `api/AtinaItems/SearchByKeyValue?ItemType=${type}&onlyWithTagId=false&showPagination=true&` +
        params,
      "items"
    );

  //* USERS

  const getUsersData = (params = "") =>
    getAtinaData("AtinaUsers?showPagination=true&" + params, "users");

  return {
    //Bookings
    getMobileBookingsData,
    getBookingTypes,
    // Items
    getAtinaItemsData,
    //Users
    getUsersData,
  };
};

export default useTableDataCalls;
