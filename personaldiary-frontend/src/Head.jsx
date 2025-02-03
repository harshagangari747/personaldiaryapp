import { useContext } from "react";
import { PageContext } from "./store/PageContext";
export default function Head() {
  const PgCtx = useContext(PageContext);
  // console.log("pgctx", PgCtx);
  const mode = PgCtx.pageData.isWriteMode;
  return (
    <div className="static bg-emerald-200 rounded-t-4xl border-double border-black">
      <div className="relative h-15 flex flex-row justify-between">
        {!mode ? (
          <>
            <p className=" w-[100%] text-center my-auto flex-col-1 focus:outline-none px-0 text-black">
              {PgCtx.pageData.title.text}
            </p>
            <p className="w-3 mr-25 mt-5">
              <i>
                <b>{PgCtx.pageData.title.date}</b>
              </i>
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Title"
              className=" w-[100%] text-center flex-col-1 focus:outline-none px-0 text-black"
            />
            <input type="date" className="w-4 mr-20 flex-col-2" />
          </>
        )}
      </div>
    </div>
  );
}
