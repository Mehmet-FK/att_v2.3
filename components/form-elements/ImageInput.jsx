import styles from "@/styles/entities.module.css";
import ImageIcon from "@mui/icons-material/Image";

const ImageInput = ({ id, name, value, onChange }) => {
  return (
    <div className={styles.imageInputWrapper}>
      {value && (
        <Image
          src={value}
          alt="icon"
          loading="eager"
          width={40}
          height={40}
          priority
        />
      )}
      <input
        id={id}
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
