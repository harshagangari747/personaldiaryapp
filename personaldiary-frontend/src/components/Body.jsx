import { useContext } from "react";
import { PageContext } from "../store/PageContext";

export default function Body({ notes }) {
  const PgCtx = useContext(PageContext);
  const mode = PgCtx.pageData.isWriteMode;
  return (
    <div className=" w-auto flex  top-150 text-black  border-x-1 border-black-800 bg-zinc-300">
      <div className="flex-row ">
        <div
          id="textarea"
          className="inline-block textarea w-[100%] h-180 text-left focus:outline-none font-monospace font-lightfd text-xl resize-none p-2"
          defaultValue=""
          ref={notes}
          contentEditable={mode}
        >
          {!mode ? PgCtx.pageData.notes : undefined}
        </div>
      </div>
    </div>
  );
}
