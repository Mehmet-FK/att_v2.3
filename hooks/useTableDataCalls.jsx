import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  editOneObject,
  fetchFail,
  fetchStart,
  getSuccess,
  stopLoading,
} from "@/redux/slices/attensamSlice";
import { toastErrorNotify, toastSuccessNotify } from "@/helpers/ToastNotify";
import {
  itemTableTypeConstants,
  tableNameConstants,
} from "@/helpers/Constants";

const useTableDataCalls = () => {
  const dispatch = useDispatch();
  const { axiosTableDataPhase1, axiosWithToken } = useAxios();

  //!--------------- GET CALL --------------
  const getAtinaData = async (url, dataName, version) => {
    dispatch(fetchStart());

    let res = null;
    let error = null;

    const axiosVersion = version === 1 ? axiosTableDataPhase1 : axiosWithToken;

    try {
      const { data } = await axiosVersion.get(url);
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

  //!--------------- POST CALL --------------
  const postAtinaData = async (url, params) => {
    try {
      const x = await axiosTableDataPhase1.post(`${url}`, params);
      toastSuccessNotify(`Erfolgreich durchgeführt..`);
    } catch (error) {
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      dispatch(
        fetchFail({
          message: error.message,
        })
      );
      console.log(error);
    }
  };
  const postUserData = (params) => {
    const editedRoles = params.roleIds.map((x) => Number(x));
    const editedParams = {
      ...params,
      roleIds: editedRoles,
    };
    postAtinaData("AtinaUsers/register", editedParams);

    // getUsersData();
  };

  //!--------------- PUT CALL --------------

  const putAtinaData = async (url, info) => {
    try {
      await axiosTableDataPhase1.put(`${url}/${info.id}`, info);
      // toastSuccessNotify(`Etwas ist schiefgelaufen..`);
    } catch (err) {
      const { message } = err;
      dispatch(fetchFail({ message }));
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(`${message}`);
      console.log(err);
    }
  };

  const putUserData = async (info) => {
    const roles = info?.roleIds;
    try {
      const editedData = {
        id: info.id,
        username: info.username,
        firstname: info.firstname,
        lastname: info.lastname,
        personnelNumber: info.personnelnumber,
        password: info.password ? info.password : "",
        client: info.client,
        settlement: info.settlement,
        roleIds: roles,
      };
      await axiosWithToken.post("/atina/AtinaUsers/update", editedData);

      const xData = {
        userInfo: {
          id: info.id,
          externalUserID: info.externalUserID,
          username: info.username,
          passwordHash: info.passwordHash,
          passwordSalt: info.passwordSalt,
          externalPersonnelID: info.externalPersonnelID,
          personnelnumber: info.personnelnumber,
          firstname: info.firstname,
          lastname: info.lastname,
          client: info.client,
          settlement: info.settlement,
          isAdministrator: info.isAdministrator,
        },
        roles: info?.roleIds,
      };

      dispatch(editOneObject({ data: xData, modul: tableNameConstants.USERS }));

      toastSuccessNotify(`Erfolgreich durchgeführt..`);
    } catch (err) {
      const { message } = err;
      dispatch(fetchFail({ message }));
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(`${message}`);
      console.log(err);
    }
  };

  const assignMultipleUserRoles = (userids, roleIds, users) => {
    dispatch(fetchStart());
    try {
      //Post Call to assign user roles

      //* axiosWithToken.post("AtinaUserRoles/assign/multiple", {
      //*   userIds: userids,
      //*   roleIds: roleIds,
      //* });

      // Edit Present Users to avoid a new get call
      users.forEach((user) => {
        const { userInfo } = user;
        const xData = {
          userInfo: {
            id: userInfo.id,
            externalUserID: userInfo.externalUserID,
            username: userInfo.username,
            passwordHash: userInfo.passwordHash,
            passwordSalt: userInfo.passwordSalt,
            externalPersonnelID: userInfo.externalPersonnelID,
            personnelnumber: userInfo.personnelnumber,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            client: userInfo.client,
            settlement: userInfo.settlement,
            isAdministrator: userInfo.isAdministrator,
          },
          roles: roleIds,
        };
        dispatch(
          editOneObject({ data: xData, modul: tableNameConstants.USERS })
        );
      });
      toastSuccessNotify(`Erfolgreich aktualisiert..`);
    } catch (error) {
      dispatch(fetchFail({ message: error?.message }));
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(`${error?.message}`);
      console.log(error?.message);
    } finally {
      dispatch(stopLoading());
    }
  };

  //* BOOKINGS

  const getBookingTypes = () =>
    getAtinaData("api/AtinaMasterData/GetBookingTypes", "bookingTypes", 1);

  const getMobileBookingsData = (params = "") => {
    getAtinaData(
      "api/AtinaMobileBookings?showPagination=true&" + params,
      tableNameConstants.BOOKINGS,
      1
    );
  };

  //* ITEMS

  const getAtinaItemsData = (
    params = "",
    type = itemTableTypeConstants.ORDER
  ) =>
    getAtinaData(
      `api/AtinaItems/SearchByKeyValue?ItemType=${type}&onlyWithTagId=false&showPagination=true&` +
        params,
      tableNameConstants.ITEMS,
      1
    );

  //* USERS

  const getUsersData = (params = "") =>
    getAtinaData(
      "/atina/AtinaUsers?showPagination=true&" + params,
      tableNameConstants.USERS,
      2
    );

  const getWorkflowsForUserRoles = () =>
    getAtinaData("/api/Workflow/GetWorkflowsForUserRoles", "userRoles", 2);

  return {
    //Bookings
    getMobileBookingsData,
    getBookingTypes,
    // Items
    getAtinaItemsData,
    //Users
    getUsersData,
    postUserData,
    putUserData,
    assignMultipleUserRoles,
    getWorkflowsForUserRoles,
  };
};

export default useTableDataCalls;
