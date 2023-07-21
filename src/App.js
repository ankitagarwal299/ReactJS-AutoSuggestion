import "./styles.css";
import React, { useEffect, useState, useRef } from "react";

//https://www.youtube.com/watch?v=vTLRpmNMQ8E&list=PL_KW_uw2ITn8xWRkGZjKTfb-9xj_pJfgT&index=4

export default function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Auto Suggestion</h1>
      <div className="container">
        <Search></Search>
      </div>
    </div>
  );
}

function Search() {
  const dropDownRef = useRef(null);

  const [userSearchText, setUserSearchText] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [options, setOptions] = useState(["sdaf", "sadf"]);

  useEffect(() => {
    function abc(e) {
      if (e.target !== dropDownRef.current) {
        setDropDown(false);
      }
    }
    document.addEventListener("click", abc);

    return () => document.removeEventListener("click", abc);
  }, []);

  function getSuggestions() {
    var pre = "pre";
    var post = "post";
    var results = [];
    let random = Math.floor(Math.random * 5 + 1);
    console.log("outide Promise", userSearchText);

    return new Promise((resolve, reject) => {
      console.log("inside Promise", userSearchText);

      setTimeout(() => {
        results.push(pre + " " + userSearchText);
        results.push(userSearchText);
        results.push(userSearchText + " " + post);
        results.push(pre + " " + userSearchText + " " + post);
        resolve(results);
      }, random);
    });
  }

  useEffect(() => {
    async function makeApiCall() {
      try {
        let resp = await getSuggestions();
        setOptions(resp);
      } catch (err) {
        setOptions([]);
        setDropDown(false);
      }
    }
    makeApiCall();
  }, [userSearchText]);

  function handle(e) {
    setUserSearchText(e.target.value);
    setDropDown(true);

    //makeApiCall(e.target.value);

    if (e.target.value === undefined || e.target.value.length === 0) {
      setOptions([]);
      setDropDown(false);
    }
  }

  return (
    <>
      <div className="input-container" tabIndex="-1">
        <input
          type="text"
          name="search"
          value={userSearchText}
          onChange={(e) => handle(e)}
        />
        {dropDown && (
          <div ref={dropDownRef} className="dropDown-container">
            {options.map((e, index) => (
              <div key={index} onClick={() => setUserSearchText(e)}>
                {e}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
