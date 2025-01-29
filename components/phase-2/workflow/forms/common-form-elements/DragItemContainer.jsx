import useDragAndDropUtils from "@/hooks/workflow-hooks/workflow-form-ui-hooks/useDragAndDropUtils";
import css from "@/styles/common-style.module.css";

const DragItemContainer = ({
  itemTitle,
  isDraggedOver,
  elements,
  setElements,
  children,
}) => {
  const {
    assignSortOrderAndDragIndicator,
    onDragStart,
    onDragEnter,
    onDragEnd,
  } = useDragAndDropUtils(elements, setElements);

  return (
    <div
      droppable
      draggable
      className={css.flex_row}
      title={itemTitle || ""}
      style={{
        marginRight: "-15px",
        paddingLeft: "5px",
        paddingRight: "10px",
        paddingBlock: isDraggedOver ? "15px" : "5px",
        borderBlock: isDraggedOver && "1px solid #ccc",
        transition: "all 0.2s ease-in-out ",
      }}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default DragItemContainer;
