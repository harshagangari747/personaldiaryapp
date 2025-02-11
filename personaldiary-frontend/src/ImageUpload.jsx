export default function (props, { imageRef }) {
  console.log("imref", imageRef);
  function handleImageDelete() {
    console.log("handle delete:", props.id);
    return props.onDelete(props.id);
  }
  return (
    <div>
      <input
        ref={imageRef}
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
