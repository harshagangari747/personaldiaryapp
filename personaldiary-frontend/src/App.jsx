import "./App.css";
import Head from "./Head";
import Body from "./Body";
import Foot from "./Foot";
import Image from "./Image";
import NavButton from "./NavButton";
import { PageContext } from "./store/PageContext.jsx";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({});
  const [isWriting, setIsWriting] = useState(false);
  const [pageDate, setPageDate] = useState();

  async function getPage(date) {
    try {
      console.log("got date", date);
      const url = date
        ? "http://localhost:5000/page?date="
        : "http://localhost:5000/";

      const response = await fetch(url + (date ? date : ""), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("something is wrong");
      }

      let responseData = await response.json();

      setPageData(() => {
        setPageDate(responseData.title.date);
        setLoading(false);
        return responseData;
      });
    } catch (err) {
      console.log("err", err);
      setLoading(true);
    }
  }

  useEffect(() => {
    getPage(pageDate);
  }, [pageDate]);

  async function handlePostPage() {
    try {
      const response = fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(pageData),
      });

      if (!response.ok) {
        throw new Error("Can't post the page...");
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  function handleReadWriteButton() {
    setIsWriting((prevIsWriting) => {
      const newIsWriting = !prevIsWriting;

      setPageData((prevData) => {
        return { ...prevData, isWriteMode: newIsWriting };
      });

      return newIsWriting;
    });
  }

  function handlePageTurn(isLeft) {
    let partialDate = pageDate.split("/");
    console.log("partial date", partialDate);

    setPageDate(() => {
      const currDate = new Date(pageDate);

      const nextDate = isLeft
        ? currDate.setDate(currDate.getDate() - 1)
        : currDate.setDate(currDate.getDate() + 1);

      return new Date(nextDate).toLocaleDateString();
    });
  }

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="flex flex-row gap-10">
      <PageContext.Provider value={{ pageData }}>
        <div className="w-[40vw] flex-col-1">
          <Image />
          <NavButton
            class="bg-indigo-400 absolute top-180 left-60"
            display="<|"
            onClick={() => {
              handlePageTurn(true);
            }}
          />
        </div>
        <div className="w-[56vw] mx-0 flex-col-2">
          <Head />
          <Body />
          <Foot />
        </div>
        <div className="w-[40vw] flex-col-3">
          <div className="flex flex-row">
            <button onClick={handleReadWriteButton}>
              {isWriting ? "Read" : "Write"}
            </button>

            {isWriting && <button onClick={handlePostPage}>Post</button>}
          </div>
          <Image />
          <NavButton
            class="to-indigo-100 absolute top-180 right-60"
            display="|>"
            onClick={() => {
              handlePageTurn(false);
            }}
          />
        </div>
      </PageContext.Provider>
    </div>
  );
}

export default App;
