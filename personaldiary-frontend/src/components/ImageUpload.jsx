import React from "react";

export default function ImageUpload({ imgRef, id, onDelete }) {
  console.log("imref", imgRef);

  function handleImageDelete() {
    console.log("handle delete:", id);
    return onDelete(id);
  }

  return (
    <div>
      <input
        ref={imgRef}
        className="flex-col-1"
        type="file"
        accept=".jpg, .png, .jpeg"
      />
      <button
        className="bg-lime-400 flex-col-2 p-0"
        onClick={handleImageDelete}
      >
        -
      </button>
    </div>
  );
}
