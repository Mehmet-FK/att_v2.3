import IconSelect from "@/components/form-elements/IconSelect";
import ListViewElementRow from "./ListViewElementRow";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";

const ListViewElement = ({ element, listViewId }) => {
  const { listViewElements } = useSelector((state) => state.workflow);

  const addListViewElementRow = () => {};

  const removeElement = () => {
    // return;
    setListElements((prev) => prev.filter((el) => el.id !== element.id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListElements((prev) =>
      prev.map((el) => (el.id === element.id ? { ...el, [name]: value } : el))
    );
  };

  const handleBlur = () => {};
  return (
    <>
      <div className={css.elements_container}>
        <div className={css.flex_row}>
          <span
            className={css.remove_element_btn}
            title="Remove Element"
            onClick={removeElement}
          >
            ×
          </span>
          <div className={css.flex_column}>
            <IconSelect
              size={"small"}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {element.listViewRows.map((elementRow) => (
              <ListViewElementRow
                key={elementRow.id}
                elementID={element.id}
                elementRowValues={elementRow}
                // setListElements={setListElements}
              />
            ))}
          </div>
          <span
            className={css.add_row_btn}
            title="Add Row"
            onClick={addListViewElementRow}
          >
            +
          </span>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default ListViewElement;
