// import styles from "@/styles/entities.module.css";
import ImageIcon from "@mui/icons-material/Image";

const ImageInput = ({ id, name, value, onChange }) => {
  return (
    <div className={"ent_imageInputWrapper"}>
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
        className={"ent_imageInput"}
        onChange={onChange}
        name={name}
        type="file"
        accept="image/*"
        placeholder="Icon URL"
      />
      <span className={"ent_imgBtn"}>{<ImageIcon />}</span>
    </div>
  );
};
export default ImageInput;
