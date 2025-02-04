import { useContext } from "react";

import { PageContext } from "./store/PageContext";
export default function Image() {
  const PgCtxt = useContext(PageContext);

  return (
    <div>
      {PgCtxt.pageData.images.map((x) => {
        return (
          <img
            src={x}
            className="w-50 h-50 shadow-xl rounded-xl mb-12 border-2 border-dashed"
          />
        );
      })}
    </div>
  );
}
