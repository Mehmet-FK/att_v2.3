import { TextField } from "@mui/material";
import css from "@/styles/workflow-forms/list-view-form.module.css";

const ListViewElementRow = ({
  elementID,
  elementRowValues,
  setListElements,
  handleElementsBlur,
}) => {
  const removeRow = () => {
    setListElements((prev) => {
      let temp = prev.map((el) =>
        el.id === elementID
          ? {
              ...el,
              listViewRows: el.listViewRows.filter(
                (r) => r.id !== elementRowValues.id
              ),
            }
          : el
      );

      return temp.map((el) =>
        el.id === elementID
          ? {
              ...el,
              listViewRows: el.listViewRows.map((r, index) => ({
                ...r,
                listViewRowNumber: index + 1,
              })),
            }
          : el
      );
    });
  };

  const handleChangeElementRow = (e) => {
    const { name, value } = e.target;

    setListElements((prev) =>
      prev.map((el) =>
        el.id === elementID
          ? {
              ...el,
              listViewRows: el.listViewRows.map((row) =>
                row.id === elementRowValues.id ? { ...row, [name]: value } : row
              ),
            }
          : el
      )
    );
  };

  return (
    <div
      style={{
        border: "1px solid #aaa5",
        padding: "5px",
        position: "relative",
      }}
      className={css.flex_column}
    >
      <div className={css.flex_row}>
        <TextField
          onChange={(e) => handleChangeElementRow(e, elementRowValues.id)}
          onBlur={handleElementsBlur}
          value={elementRowValues?.text || ""}
          variant="outlined"
          size="small"
          label="Text"
          name="text"
          fullWidth
        />
        <TextField
          onChange={(e) => handleChangeElementRow(e, elementRowValues.id)}
          onBlur={handleElementsBlur}
          value={elementRowValues?.listViewRowNumber || ""}
          variant="outlined"
          size="small"
          label="Row Number"
          name="listViewRowNumber"
          fullWidth
        />
        <TextField
          onChange={(e) => handleChangeElementRow(e, elementRowValues.id)}
          onBlur={handleElementsBlur}
          value={elementRowValues?.fontFamily || ""}
          variant="outlined"
          size="small"
          label="Font Family"
          name="fontFamily"
          fullWidth
        />
        <TextField
          onChange={(e) => handleChangeElementRow(e, elementRowValues.id)}
          onBlur={handleElementsBlur}
          value={elementRowValues?.fontColor || ""}
          variant="outlined"
          size="small"
          label="Font Color"
          name="fontColor"
          fullWidth
        />
      </div>
      <span
        title="remove row"
        className={css.remove_row_btn}
        onClick={removeRow}
      >
        ×
      </span>
    </div>
  );
};
export default ListViewElementRow;
