import { useRef } from "react";

const useDragAndDropUtils = (elements, setElements) => {
  const draggingElementRef = useRef(null);
  const draggedOverElementRef = useRef(null);

  const setDragImageOnDragStart = (e) => {
    const dragElement = e.target;
    const clone = dragElement.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.top = "-1000px";
    clone.style.left = "-1000px";
    clone.style.background = "#ff0000";
    e.target.style.borderRadius = "8px";
    clone.style.marginTop = "500px";
    clone.style.width = `${dragElement.offsetWidth}px`;
    clone.style.height = `60px`;
    clone.style.cursor = "grab";
    clone.style.pointerEvents = "none";

    document.body.appendChild(clone);

    const offsetX = dragElement.offsetWidth - 10;
    const offsetY = dragElement.offsetHeight - 20;

    e.dataTransfer.setDragImage(clone, offsetX, offsetY);

    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);
  };

  const createDropAnimationOnDragEnd = (e) => {
    e.target.style.backgroundColor = "rgba(0, 157, 255, 0.30)";
    e.target.style.borderRadius = "8px";
    setTimeout(() => {
      e.target.style.backgroundColor = "";
      e.target.style.borderRadius = "";
    }, 1000);
  };

  const assignSortOrderAndDragIndicator = (itemList) => {
    const preparedItems = itemList?.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
      isDraggedOver: false,
    }));
    setElements(preparedItems);
  };

  const onDragStart = (e, element, index) => {
    draggingElementRef.current = { element, index };
    setDragImageOnDragStart(e);
  };

  const onDragEnter = (element, index) => {
    draggedOverElementRef.current = { element, index };
  };

  const onDragEnd = (e) => {
    let tempElements = [...elements];

    if (!draggedOverElementRef.current || !draggingElementRef.current) return;

    const draggingElement = draggingElementRef.current.element;
    const draggingElementIndex = draggingElementRef.current.index;
    const draggedOverElementIndex = draggedOverElementRef.current.index;

    tempElements.splice(draggingElementIndex, 1);
    tempElements.splice(draggedOverElementIndex, 0, draggingElement);

    tempElements = tempElements.map((element, index) => ({
      ...element,
      sortOrder: index + 1,
    }));

    draggingElementRef.current = null;
    draggedOverElementRef.current = null;

    setTimeout(() => {
      setElements(tempElements);
      createDropAnimationOnDragEnd(e);
    }, 200);
  };

  return {
    assignSortOrderAndDragIndicator,
    onDragStart,
    onDragEnter,
    onDragEnd,
  };
};

export default useDragAndDropUtils;
