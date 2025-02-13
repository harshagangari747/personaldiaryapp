import React, { useState, useRef } from "react";
import ImageUpload from "./ImageUpload.jsx";

export default function FileUpload({ imagesRef }) {
  console.log("fupload", imagesRef);
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

        if (!imagesRef.current) {
          imagesRef.current = [];
        }
        imagesRef.current[uid - 1] = React.createRef();

        newImageArray.push(
          <ImageUpload
            imgRef={imagesRef.current[uid - 1]}
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
      let newImageArray = prevList.filter((_, index) => index !== id);
      if (imagesRef.current) {
        imagesRef.current.splice(id, 1);
      }
      if (newImageArray.length < 4) {
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
