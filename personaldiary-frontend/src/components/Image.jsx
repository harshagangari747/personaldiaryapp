import { useContext } from "react";

import { PageContext } from "../store/PageContext";
export default function Image({ even }) {
  const PgCtxt = useContext(PageContext);
  const images = PgCtxt.pageData.images;
  let randomNum = Math.floor(Math.random() * 100);
  let rotate = "rotate-" + randomNum;
  //console.log(images, "images jsx");
  //console.log("randomNum", randomNum);
  return (
    <div>
      {images &&
        images.map((x, index) => {
          if (index % 2 == 0 && even) {
            return (
              <img
                src={x}
                className={`w-50 h-50 shadow-xl rounded-xl mb-12 border-2 border-dashed rotate-${randomNum}`}
              />
            );
          }
          if (!even && index % 2 != 0) {
            return (
              <img
                src={x}
                className={`w-50 h-50 shadow-xl rounded-xl mb-12 border-2 border-dashed ${rotate}`}
              />
            );
          }
        })}
    </div>
  );
}
