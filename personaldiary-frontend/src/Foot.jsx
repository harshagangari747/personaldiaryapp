import { useContext } from "react";
import { PageContext } from "./store/PageContext";

export default function Foot() {
  const PgCtx = useContext(PageContext);
  const mode = PgCtx.pageData.isWriteMode;
  return (
    <div className=" bg-emerald-200 rounded-b-4xl border-double border-black ">
      <div className=" w-200 h-15 flex flex-row justify-between">
        <i>
          <b className="align-bottom">Quote: </b>
        </i>
        <input
          type="text"
          className=" w-auto mx-auto focus:outline-none px-10 text-black"
          value={!mode ? PgCtx.pageData.quote : ""}
          contentEditable={mode}
        />
      </div>
    </div>
  );
}
