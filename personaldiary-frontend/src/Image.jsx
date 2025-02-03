import { useContext } from "react";

import { PageContext } from "./store/PageContext";
export default function Image() {
  const PgCtxt = useContext(PageContext);
  const image = PgCtxt.pageData.images[0];

  return (
    <div>
      <img src={image} className="w-auto h-40" />
    </div>
  );
}
