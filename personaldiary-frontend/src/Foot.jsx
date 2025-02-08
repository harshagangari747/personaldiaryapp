import { useContext, useEffect } from "react";
import { PageContext } from "./store/PageContext";

export default function Foot({ foot }) {
  const PgCtx = useContext(PageContext);
  const mode = PgCtx.pageData.isWriteMode;

  useEffect(() => {
    // Reset the input field when mode is true
    if (mode && foot.current) {
      foot.current.value = "";
    }
  }, [mode, foot]);

  console.log("writemode", mode);
  return (
    <div className=" bg-slate-600 text-white rounded-b-4xl border-t-8 border-double border-white ">
      <div className=" w-200 h-15 flex flex-row justify-between">
        <span>
          <b className=" mx-auto my-auto relative px-5">Quote: </b>
        </span>

        <input
          ref={foot}
          type="text"
          className="relative mx-auto focus:outline-none inline w-[100%]"
          defaultValue={!mode ? PgCtx.pageData.quote : ""}
          id="foot"
          placeholder={!mode ? "" : "enter a quote here"}
          disabled={!mode}
          {...(!mode ? { value: PgCtx.pageData.quote } : {})}
        />
      </div>
    </div>
  );
}
