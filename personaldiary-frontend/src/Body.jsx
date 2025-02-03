import { useContext } from "react";
import { PageContext } from "./store/PageContext";

export default function Body() {
  const PgCtx = useContext(PageContext);
  const mode = PgCtx.pageData.isWriteMode;
  return (
    <div className=" w-auto flex static top-150 ">
      <div className="flex-row">
        <div
          contentEditable={mode}
          id="textarea"
          className="textarea w-auto h-180 text-left focus:outline-none font-sans font-lightfd text-2xl italic resize-none p-2"
          rows={10}
          cols={50}
          placeholder="Your thoughts here.."
        >
          <p>{!mode ? PgCtx.pageData.notes : ""}</p>
        </div>
        <pre></pre>
      </div>
    </div>
  );
}
