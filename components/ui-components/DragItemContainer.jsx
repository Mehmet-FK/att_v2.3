import css from "@/styles/common-style.module.css";

const DragItemContainer = ({
  itemTitle,
  isDraggedOver,
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  handleDragEnd,
  children,
}) => {
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
    >
      {children}
    </div>
  );
};

export default DragItemContainer;
