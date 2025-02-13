import "./App.css";
import Head from "./components/Head.jsx";
import Body from "./components/Body.jsx";
import Foot from "./components/Foot.jsx";
import Image from "./components/Image.jsx";
import NavButton from "./components/NavButton.jsx";
import { PageContext } from "./store/PageContext.jsx";
import { useEffect, useRef, useState } from "react";
import FileUpload from "./components/FileUpload.jsx";
import decodeBase64 from "./Utilities/ImageDecode.js";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({});
  const [isWriting, setIsWriting] = useState(false);
  const [pageDate, setPageDate] = useState(undefined);

  const titleRef = useRef("");
  const dateRef = useRef(null);
  const notesRef = useRef("");
  const imagesRef = useRef([]);
  const quoteRef = useRef("");

  // get details of a page :
  // optional: date
  async function getPage(date) {
    try {
      let url = "http://127.0.0.1:5000";
      if (date === undefined) {
        date = new Date().toLocaleDateString();
      }
      url = url + "/page?date=" + date;
      console.log(url);

      const response = await fetch(url, {
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
      console.log("respon", responseData);

      if (Object.keys(responseData).length !== 0) {
        setPageData(() => {
          setPageDate(date);
          setLoading(false);
          responseData.title.date = new Date(
            responseData.title.date
          ).toLocaleDateString();
          return responseData;
        });
      } else {
        setPageData(() => {
          setPageDate(date);
          setLoading(false);
          responseData["title"] = {};
          responseData["title"]["date"] = date;
          responseData["isWriteMode"] = isWriting;
          responseData["quote"] = "";
          return responseData;
        });

        console.log("response", responseData);
      }
    } catch (err) {
      console.log("err", err);
      setLoading(true);
    }
  }

  //Call getPage when page date changed
  useEffect(() => {
    getPage(pageDate);
  }, [pageDate]);

  // write the details of a page
  async function handlePostPage() {
    const formData = new FormData();
    // const reader = new FileReader();
    // const imageBase64 = imagesRef.current.map((ref) =>
    //   reader.readAsDataURL(ref.current.files[0])
    // );
    const obj = {
      title: {
        text: titleRef.current.value,
        date: new Date(dateRef.current.value).toLocaleDateString(),
      },
      notes: notesRef.current.innerText,
      quote: quoteRef.current.value,
    };
    const images = imagesRef.current.map((img) => img.current.files[0]);
    formData.append("text", JSON.stringify(obj));
    images.forEach((img) => formData.append("images", img));

    console.log("formdata img", formData.get("images"));
    console.log("form data obj", formData.get("text"));

    try {
      const response = await fetch("http://127.0.0.1:5000/page", {
        method: "POST",
        headers: {},
        mode: "cors",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Can't post the page...");
      } else {
        const result = await response.json();
        result["images"] = await decodeBase64(result["images"]);
        setPageData(() => {
          setIsWriting(false);
          return result;
        });
      }
      console.log("response body", response.body);
    } catch (err) {
      console.log("error", err);
    }
  }

  // Handle write/read toggle button
  function handleReadWriteButton() {
    setIsWriting((prevIsWriting) => {
      const newIsWriting = !prevIsWriting;
      console.log("handle toggle", newIsWriting);

      if (newIsWriting) {
        setPageData({ pageData: {}, isWriteMode: newIsWriting });
      } else {
        setPageDate();
      }

      return newIsWriting;
    });
  }

  // Logic to turn a page left or right
  function handlePageTurn(isLeft) {
    console.log("PageDate", pageDate);
    let partialDate = pageDate && pageDate.split("/");
    console.log("partial date", partialDate, "page date", pageDate);

    setPageDate(() => {
      const currDate = new Date(pageDate);

      const nextDate = isLeft
        ? currDate.setDate(currDate.getDate() - 1)
        : currDate.setDate(currDate.getDate() + 1);
      console.log("new date", new Date(nextDate).toLocaleDateString());

      return new Date(nextDate).toLocaleDateString();
    });
  }

  // Loading page while details are fetched
  if (isLoading) {
    return "Loading...";
  }

  // Return the component
  return (
    <div className="flex flex-row gap-10 mt-5">
      <PageContext.Provider value={{ pageData }}>
        <div className="w-[40vw] flex-col-1">
          <Image />
          {!isWriting && (
            <NavButton
              class="bg-indigo-400 absolute top-180 left-60"
              display="<|"
              onClick={() => {
                handlePageTurn(true);
              }}
            />
          )}
        </div>
        <div className="w-[56vw] mx-0 flex-col-2">
          <Head head={{ titleRef, dateRef }} />
          <Body notes={notesRef} />
          <Foot foot={quoteRef} />
        </div>
        <div className="w-[40vw] flex-col-3">
          <div className="flex flex-row my-2">
            <button className="mx-2" onClick={handleReadWriteButton}>
              {isWriting ? "Read" : "Write"}
            </button>

            {isWriting && (
              <button className="mx-2" onClick={handlePostPage}>
                Post
              </button>
            )}
          </div>
          <Image />
          {!isWriting ? (
            <NavButton
              class="to-indigo-100 absolute top-180 right-60"
              display="|>"
              onClick={() => {
                handlePageTurn(false);
              }}
            />
          ) : (
            <FileUpload imagesRef={imagesRef} height="50px" width="50px" />
          )}
        </div>
      </PageContext.Provider>
    </div>
  );
}

export default App;
