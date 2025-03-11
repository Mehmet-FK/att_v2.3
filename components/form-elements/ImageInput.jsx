import css from "@/styles/entity-styles/entities.module.css";
import ImageIcon from "@mui/icons-material/Image";

const ImageInput = ({ id, name, value, onChange }) => {
  const imgUrl = value
    ? value
    : "/assets/dashboard-icons/default-card-icon.svg";

  return (
    <div className={css.imageInputWrapper}>
      <img src={imgUrl} className={css.img_display} alt="icon" />

      <label htmlFor={id} className={css.img_input_label}>
        Bild hochladen
      </label>
      <input
        id={id}
        // className={css.imageInput}
        style={{ display: "none" }}
        onChange={onChange}
        name={name}
        type="file"
        accept="image/*"
        placeholder="Icon URL"
      />
    </div>
  );
};
export default ImageInput;
