import styles from "@/styles/entities.module.css";
import ImageIcon from "@mui/icons-material/Image";

const ImageInput = ({ name, onChange }) => {
  return (
    <div className={styles.imageInputWrapper}>
      <input
        className={styles.imageInput}
        onChange={onChange}
        name={name}
        type="file"
        accept="image/*"
        placeholder="Icon URL"
      />
      <span className={styles.imgBtn}>{<ImageIcon />}</span>
    </div>
  );
};
export default ImageInput;
