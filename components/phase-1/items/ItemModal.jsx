import { useEffect, useState } from "react";
import MeterModal from "./item-modals/MeterModal";
import OrderModal from "./item-modals/OrderModal";
import VehicleModal from "./item-modals/VehicleModal";

const ItemsModal = ({ setOpenItemsModal, openItemsModal, item, type }) => {
  const [inputVal, setInputVal] = useState(item ? item : {});
  // const { user } = useSelector((state) => state.settings);

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
      {type === "Order" && (
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
      {type === "Meter" && (
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
      {type === "Vehicle" && (
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
