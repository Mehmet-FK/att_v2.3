import { useRef } from "react";

const useDragAndDropUtils = (elements, setElements) => {
  const draggingElementRef = useRef(null);
  const draggedOverElementRef = useRef(null);

  const cloneDraggedItem = (dragElement) => {
    const dragItem = dragElement.querySelector(".drag-image-element");
    const clone = dragItem.cloneNode(true);
    return clone;
  };

  const addOpacityOnDragStart = (e) => {
    e.target.style.opacity = "0.5";
  };

  const removeOpacityOnDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const setDragImageOnDragStart = (e) => {
    const dragElement = e.target;
    const clone = cloneDraggedItem(dragElement);
    clone.style.position = "absolute";
    clone.style.top = "-1000px";
    clone.style.left = "-1000px";
    clone.style.backgroundColor = "#e1000080";
    clone.style.borderRadius = "8px";
    clone.style.marginTop = "500px";
    clone.style.width = "100%";
    clone.style.maxWidth = "300px";
    clone.style.cursor = "grab";
    clone.style.pointerEvents = "none";

    document.body.appendChild(clone);

    const offsetX = clone.offsetWidth - 10;
    const offsetY = clone.offsetHeight - 20;

    e.dataTransfer.setDragImage(clone, offsetX, offsetY);

    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);
  };

  const createDropAnimationOnDragEnd = (e) => {
    e.target.style.backgroundColor = "#009dff80";
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
    addOpacityOnDragStart(e);
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
    console.log({ tempElements });
    removeOpacityOnDragEnd(e);
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
