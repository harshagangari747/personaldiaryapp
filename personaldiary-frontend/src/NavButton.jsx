import { useContext } from "react";
import { PageContext } from "./store/PageContext";

export default function NavButton(props) {
  const PgCtxt = useContext(PageContext);
  const mode = PgCtxt.pageData.isWriteMode;
  const xml = !mode ? (
    <button className={props.class} onClick={props.onClick}>
      {props.display}
    </button>
  ) : (
    ""
  );

  return xml;
}
