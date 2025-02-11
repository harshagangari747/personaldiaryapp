import { useState } from "react";
import ImageUpload from "./ImageUpload";

export default function FileUpload({ imagesRef }) {
  console.log("fupload", imagesRef[0]);
  const [imageStorageArray, setImageStorageArray] = useState([]);
  const [maxImageUploadsReached, setMaxImageUploadsReached] = useState(false);

  function handleFileAdd() {
    if (imageStorageArray.length >= 4) {
      setMaxImageUploadsReached(true);
      return;
    } else {
      setMaxImageUploadsReached(false);
      setImageStorageArray((prevList) => {
        const newImageArray = [...prevList];
        const uid = newImageArray.length + 1;
        console.log("uid", uid);
        newImageArray.push(
          <ImageUpload
            imageRef={imagesRef[uid - 1]}
            onDelete={handleImageDelete}
            key={uid}
            id={uid}
          />
        );
        return newImageArray;
      });
    }
  }

  function handleImageDelete(id) {
    console.log("handle image delete triggered", id);

    setImageStorageArray((prevList) => {
      let newImageArray = [...prevList];
      delete newImageArray[id];
      if (!maxImageUploadsReached) {
        setMaxImageUploadsReached(false);
      }
      return newImageArray;
    });
  }

  return (
    <div className="flex flex-row flex-wrap">
      {imageStorageArray}
      <button onClick={handleFileAdd} className="flex-row-2">
        +
      </button>

      {maxImageUploadsReached && <span>Max file upload limit reached</span>}
    </div>
  );
}
