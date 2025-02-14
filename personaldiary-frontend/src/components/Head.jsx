import { useContext } from "react";
import { PageContext } from "../store/PageContext";

export default function Head({ head, onDateChange }) {
  const PgCtx = useContext(PageContext);

  const mode = PgCtx.pageData.isWriteMode;

  function handleReadPageDateChange(event) {
    console.log("date changed", event.target.value);
    !mode && onDateChange(event.target.value);
  }

  return (
    <div className=" bg-slate-600 text-zinc-200 rounded-t-4xl top-25 border-b-gray border-b-8 border-double">
      <div className="relative h-15 flex flex-row">
        {!mode ? (
          <p className="m0 w-4/5 text-center my-auto flex-col-1 focus:outline-none px-0 ">
            {PgCtx.pageData.title?.text}
          </p>
        ) : (
          <input
            type="text"
            placeholder="Title"
            className=" w-4/5 text-center flex-col-1 focus:outline-none px-0"
            defaultValue=""
            ref={head.titleRef}
          />
        )}
        <input
          type="date"
          ref={head.dateRef}
          onChange={handleReadPageDateChange}
        />
      </div>
    </div>
  );
}

/***
 * {!mode ? (
          <>
            <p className="m0 w-4/5 text-center my-auto flex-col-1 focus:outline-none px-0 ">
              {PgCtx.pageData.title?.text}
            </p>
            <p className="relative w-1/5  mt-5 flex-col-2">
              <input
                type="date"
                defaultValue={PgCtx.pageData.title?.date}
                ref={head.dateRef}
                onChange={handleReadPageDateChange}
              />
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
                  className="relatvie w-100% flex-col-1 px-5 text-white"
                  ref={head.dateRef}
                />
              </>
            )} 
 */
