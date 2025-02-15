import { forwardRef } from "react";
const ErrorModal = forwardRef(function ({ error }, ref) {
  return (
    <dialog
      className="absolute p-10  bg-amber-500-200 border-2 rounded-xl mx-auto my-80"
      open
      ref={ref}
    >
      <div>
        <p> An Error Occured!</p>
        <p>Message: {error}</p>
      </div>
      <form method="dialog">
        <button type="submit" className="mx-auto top-5">
          x
        </button>
      </form>
    </dialog>
  );
});

export default ErrorModal;
