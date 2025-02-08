import { useContext } from "react";
import { PageContext } from "./store/PageContext";
export default function Head({ head }) {
  const PgCtx = useContext(PageContext);

  const mode = PgCtx.pageData.isWriteMode;

  return (
    <div className=" bg-slate-600 text-zinc-200 rounded-t-4xl top-25 border-b-gray border-b-8 border-double">
      <div className="relative h-15 flex flex-row">
        {!mode ? (
          <>
            <p className="m0 w-4/5 text-center my-auto flex-col-1 focus:outline-none px-0 ">
              {PgCtx.pageData.title?.text}
            </p>
            <p className="relative w-1/5  mt-5 flex-col-2">
              <b>{PgCtx.pageData.title?.date}</b>
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Title"
              className=" w-4/5 text-center flex-col-1 focus:outline-none px-0"
              defaultValue=""
              ref={head.titleRef}
            />
            <input
              type="date"
              className="relative w-1/5  flex-col-2 px-5"
              ref={head.dateRef}
            />
          </>
        )}
      </div>
    </div>
  );
}
