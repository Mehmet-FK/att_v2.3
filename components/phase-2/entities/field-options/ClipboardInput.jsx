import css from "@/styles/entity-styles/entities.module.css";
import { useState } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

import CopyPasteContextMenu from "@/components/menus/CopyPasteContextMenu";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const ClipBoardInput = ({ handlePasteOptions }) => {
  const [contextMenu, setContextMenu] = useState(initalContextMenu);

  const handleRightClick = (e) => {
    e.preventDefault();
    let X = e.nativeEvent.layerX;
    let Y = e.nativeEvent.layerY;
    setContextMenu({ ...contextMenu, show: true, x: X, y: Y });
  };

  const closeContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  const handleKeyboardPaste = (e) => {
    if (e.ctrlKey && e.key === "v") {
      handlePasteOptions(e);
    }
  };
  return (
    <div
      id="paste-area"
      className={css.clipboard_wrapper}
      //   style={{ zIndex: 100 }}
      contentEditable
      suppressContentEditableWarning
      onKeyDown={handleKeyboardPaste}
      onContextMenu={handleRightClick}
    >
      {contextMenu.show && (
        <CopyPasteContextMenu
          contextMenu={contextMenu}
          handleClose={closeContextMenu}
          handlePaste={handlePasteOptions}
        />
      )}
      <ContentPasteIcon sx={{ fontSize: "5rem", color: "#ccc" }} />

      <p
        className={css.clipboard_helpertext}
        contentEditable="false"
        suppressContentEditableWarning
      >
        Einfügen STRG + V
      </p>
    </div>
  );
};

export default ClipBoardInput;
