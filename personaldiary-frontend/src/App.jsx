import "./App.css";
import Head from "./Head";
import Body from "./Body";
import Foot from "./Foot";
import Image from "./Image";
import NavButton from "./NavButton";
import sampledata from "./JSON/sampledata.json";
import { PageContext } from "./store/PageContext.jsx";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({});
  const [isWriting, setIsWriting] = useState(false);

  async function getPage() {
    fetch("http://127.0.0.1:5000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => {
        console.log("response", response);
        if (!response.ok) {
          throw new Error("somethings wrong");
        }
        const responseData = response.json();
        setPageData(respData);
        setLoading(false);

        return responseData;
      })
      .catch((err) => setLoading(true));
  }

  useEffect(() => {}, []);

  // Toggle between read and write mode
  function handleReadWriteButton() {
    setIsWriting((prevIsWriting) => {
      const newIsWriting = !prevIsWriting;

      setPageData((prevData) => {
        return { ...prevData, isWriteMode: newIsWriting };
      });

      return newIsWriting;
    });
  }

  // Turn the page left
  function handleLeftPageTurn() {
    setPageData(sampledata[0]);
  }

  // Turn the page right
  function handleRightPageTurn() {
    setPageData(sampledata[1]);
  }

  // If the app is still loading, display loading text
  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="flex flex-row gap-10">
      <PageContext.Provider value={{ pageData }}>
        <div className="w-[40vw] flex-col-1">
          <div>
            <button onClick={handleReadWriteButton}>
              {isWriting ? "Read" : "Write"}
            </button>
          </div>
          <Image />
          <NavButton
            class="bg-indigo-400 absolute top-180 left-60"
            display="<|"
            onClick={handleLeftPageTurn}
          />
        </div>
        <div className="w-[56vw] mx-0 flex-col-2">
          <Head />
          <Body />
          <Foot />
        </div>
        <div className="w-[40vw] flex-col-3">
          <Image />
          <NavButton
            class="to-indigo-100 absolute top-180 right-60"
            display="|>"
            onClick={handleRightPageTurn}
          />
        </div>
      </PageContext.Provider>
    </div>
  );
}

export default App;
