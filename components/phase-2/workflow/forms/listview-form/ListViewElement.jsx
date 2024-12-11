import IconSelect from "@/components/form-elements/IconSelect";
import ListViewElementRow from "./ListViewElementRow";
import css from "@/styles/workflow-forms/list-view-form.module.css";
import { Divider } from "@mui/material";

const ListViewElement = ({
  element,
  listElements,
  setListElements,
  handleElementsBlur,
}) => {
  const addElementRow = () => {
    const max = Math.max(...element.listViewRows.map((el) => el.id), 0);
    setListElements((prev) =>
      prev.map((el) =>
        el.id === element.id
          ? {
              ...el,
              listViewRows: [
                ...el.listViewRows,
                {
                  listViewRowNumber: el.listViewRows.length + 1,
                  text: "",
                  fontFamily: "",
                  fontColor: "",
                  id: max + 1,
                },
              ],
            }
          : el
      )
    );
  };

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
              handleBlur={handleElementsBlur}
            />
            {element.listViewRows.map((elementRow) => (
              <ListViewElementRow
                key={elementRow.id}
                elementID={element.id}
                elementRowValues={elementRow}
                setListElements={setListElements}
                // handleChangeElementRow={handleChangeElementRow}
                handleElementsBlur={handleElementsBlur}
              />
            ))}
          </div>
          <span
            className={css.add_row_btn}
            title="Add Row"
            onClick={addElementRow}
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
