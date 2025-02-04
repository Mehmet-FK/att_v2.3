import { useEffect, useState } from "react";
import MeterModal from "./item-modals/MeterModal";
import OrderModal from "./item-modals/OrderModal";
import VehicleModal from "./item-modals/VehicleModal";
import { itemTableTypeConstants } from "@/helpers/Constants";

const ItemsModal = ({ setOpenItemsModal, openItemsModal, item, type }) => {
  const [inputVal, setInputVal] = useState(item ? item : {});

  const handleClose = () => {
    setOpenItemsModal(false);
    if (!item) {
      setInputVal({});
    }
  };
  const handleChange = (e) => {
    // if (!user?.isAdmin) return;
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setInputVal(item);
  }, [type, item]);

  return (
    <>
      {type === itemTableTypeConstants.ORDER && (
        <OrderModal
          item={item}
          handleClose={handleClose}
          openItemsModal={openItemsModal}
          handleChange={handleChange}
          inputVal={inputVal}
          isAdmin={false}
          // isAdmin={user?.isAdmin}
          setInputVal={setInputVal}
        />
      )}
      {type === itemTableTypeConstants.METER && (
        <MeterModal
          item={item}
          handleClose={handleClose}
          openItemsModal={openItemsModal}
          handleChange={handleChange}
          inputVal={inputVal}
          isAdmin={false}
          // isAdmin={user?.isAdmin}
          setInputVal={setInputVal}
        />
      )}
      {type === itemTableTypeConstants.VEHICLE && (
        <VehicleModal
          item={item}
          handleClose={handleClose}
          openItemsModal={openItemsModal}
          handleChange={handleChange}
          inputVal={inputVal}
          isAdmin={false}
          // isAdmin={user?.isAdmin}
          setInputVal={setInputVal}
        />
      )}
    </>
  );
};

export default ItemsModal;
