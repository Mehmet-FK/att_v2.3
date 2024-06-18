import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { memo, useEffect, useMemo, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import css from "@/styles/modals.module.css";
import Loading_Icon from "@/components/table_helpers/utils/Loading_Icon";

const ImageModal = ({ open, setOpen, index, images }) => {
  const [imageIndex, setImageIndex] = useState(index);

  const [isLoading, setIsLoading] = useState(true);
  const handleNextImage = () => {
    let total = images.length - 1;
    if (imageIndex < total) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
    setIsLoading(true);
  };
  const handlePrevImage = () => {
    let total = images.length - 1;
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(total);
    }
    setIsLoading(true);
  };

  const path = images[imageIndex]?.path;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "grid",
        placeItems: "center",
        // outline: "5px solid red",
        // outlineOffset: "-100px",
      }}
    >
      <Box component={Paper} className={css.book_img_card}>
        <Box className={css.button_wrap_left} onClick={handlePrevImage}>
          <IconButton>
            <NavigateBeforeIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>
        {isLoading && (
          <div className={css.loader_wrap}>
            <Loading_Icon />
          </div>
        )}
        <Image
          alt="Buchungen Bilder"
          onLoadingComplete={() => setIsLoading(false)}
          //   onLoad={() => setIsLoading(false)}
          src={path}
          width={650}
          height={650}
          quality={80}
          style={{
            objectFit: "contain",
            WebkitFilter: isLoading ? "blur(3px)" : "none",
            maxWidth: "100%",
            // maxHeight: "70vh",
            width: "90%",
            height: "90%",

            // boxShadow: "-2px 19px 48px -24px rgba(66, 68, 90, 1)",
            userSelect: "none",
            borderRadius: "8px",
          }}
        />

        <Box className={css.button_wrap_right} onClick={handleNextImage}>
          <IconButton>
            <NavigateNextIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageModal;
