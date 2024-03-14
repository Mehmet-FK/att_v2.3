import React from "react";

const useHelpers = () => {
  const imageToBinary = (reader) => {
    let binaryImg = null;
    // const selectedFile = e.target.files[0];
    // const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result;

      const base64String = fileContent.split(",")[1];

      const binaryBlob = atob(base64String);
      binaryImg = binaryBlob;
      // setSelectedImage(fileContent);
      // setInputVal({ ...inputVal, image: base64String });
    };

    // reader?.readAsDataURL(selectedFile);
    return binaryImg;
  };

  return { imageToBinary };
};

export default useHelpers;
