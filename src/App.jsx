import { useRef, useState } from "react";
import axios from "axios";

function App() {
  const [isToggled, setIsToggled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState("");
  const audioRef = useRef();
  const [font, setFont] = useState("Sans Serif");
  const [opened, setOpened] = useState(false);
  const [emptyErr, setEmptyErr] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const toggleTheme = () => {
    setIsToggled(!isToggled);
    document.documentElement.classList.toggle("dark");
  };

  const toggleFont = () => {
    setOpened(!opened);
  };

  const playAudio = () => {
    audioRef.current.play();
  };

  const handleSearch = () => {
    getData();
    setEmptyErr(inputValue.length === 0 ? true : false);
  };

  const instance = axios.create({
    baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  const getData = async () => {
    try {
      const response = await instance.get(`/${inputValue}`);

      setData(response.data[0]);
      console.log(data);

      setNotFound(false);
    } catch (err) {
      setNotFound(true);
      console.log("error", err);
    }
  };

  return (
    <>
      <main className="dark:bg-[#050505] min-h-full">
        <div
          className={`md:px-[40px] md:pt-[60px] px-6 pt-6 pb-12 font-${font} xl:max-w-[736px] xl:mx-auto`}>
          <header className="flex items-center justify-between mb-6">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="38"
                viewBox="0 0 34 38">
                <g
                  fill="none"
                  fill-rule="evenodd"
                  stroke="#838383"
                  stroke-linecap="round"
                  stroke-width="1.5">
                  <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28" />
                  <path stroke-linejoin="round" d="M5 37a4 4 0 1 1 0-8" />
                  <path d="M11 9h12" />
                </g>
              </svg>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-bold dark:text-[#FFF] md:text-[18px]">
                  {font}
                </span>
                <button
                  onClick={() => {
                    toggleFont();
                  }}>
                  <svg
                    className={`${opened ? `rotate-180` : ``}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="8"
                    viewBox="0 0 14 8">
                    <path
                      fill="none"
                      stroke="#A445ED"
                      stroke-width="1.5"
                      d="m1 1 6 6 6-6"
                    />
                  </svg>
                </button>
                {opened && (
                  <div className="absolute right-[90px] md:mt-[160px] md:w-44 md:right-20 w-28 mt-[150px] origin-top-right font-bold bg-white dark:bg-[#1F1F1F] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 xl:w-60 xl:right-[unset]">
                    <div
                      className="py-1 dark:text-[#FFF]"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu">
                      <div
                        onClick={() => {
                          setFont("Sans Serif");
                          setOpened(!opened);
                        }}
                        className="block px-4 py-2 text-sm md:text-base text-gray-700 cursor-pointer font-Sans Serif hover:text-gray-900 dark:text-[#FFF]"
                        role="menuitem">
                        Sans Serif
                      </div>
                      <button
                        onClick={() => {
                          setFont("Serif");
                          setOpened(!opened);
                        }}
                        className="block px-4 py-2 text-sm md:text-base text-gray-700 cursor-pointer font-Serif hover:text-gray-900 dark:text-[#FFF]"
                        role="menuitem">
                        Serif
                      </button>
                      <div
                        onClick={() => {
                          setFont("Mono");
                          setOpened(!opened);
                        }}
                        className="block px-4 py-2 text-sm md:text-base text-gray-700 cursor-pointer font-Mono hover:text-gray-900 dark:text-[#FFF]"
                        role="menuitem">
                        Mono
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <span className="w-px h-[32px] block bg-[#E9E9E9]"></span>
              <div className="flex gap-3 md:gap-5">
                <div>
                  <button
                    onClick={() => {
                      toggleTheme();
                    }}
                    className={`flex rounded-full p-1 w-[40px] h-[22px] ${
                      isToggled ? "bg-[#A445ED]" : "bg-[#757575]"
                    }`}>
                    <span
                      className={`w-[14px] h-[14px] bg-white rounded-full transform transition ${
                        isToggled ? "translate-x-[18px]" : "translate-x-0"
                      }`}></span>
                  </button>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 22 22">
                    <path
                      className={` ${isToggled ? "stroke-[#A445ED]" : ""}`}
                      fill="none"
                      stroke="#838383"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </header>

          <div
            className={`flex items-center justify-between px-6 bg-[#F4F4F4] rounded-2xl mt-6 xl:mt-[51px] mb-7 dark:bg-[#1F1F1F] dark:text-[#FFF] ${
              emptyErr ? "border-2 border-[#FF5252]" : ""
            } focus-within:border-2 focus-within:border-[#A445ED]
          `}>
            <input
              className="w-[90%] h-[48px] bg-transparent outline-none md:text-[20px] dark:bg-[#1F1F1F]"
              placeholder="Search for any word…"
              type="text"
              name=""
              id="wordInput"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <div className="hover:cursor-pointer">
              <button
                onClick={() => {
                  handleSearch();
                }}
                className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18">
                  <path
                    fill="none"
                    stroke="#A445ED"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <span
            id="emptyErr"
            className={`text-[#FF5252] text-[15px] ${
              !emptyErr ? `hidden` : "block"
            } -mt-[25px] ml-1`}>
            Whoops, can’t be empty...
          </span>

          <div
            id="noDefinitions"
            className={`${
              notFound && !emptyErr ? `flex` : `hidden`
            } flex-col items-center justify-center m-[auto] gap-6 max-w-[736px] px-6 pt-6 mb-16 text-center`}>
            <span className="text-[64px] mb-2">😕</span>
            <h4 className="text-5 text-[#2D2D2D] font-bold dark:text-[#FFF]">
              No Definitions Found
            </h4>
            <p className="text-[18px] text-[#757575] leading-6 dark:text-[#FFF]">
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.
            </p>
          </div>

          {data && (
            <div className={`${!notFound ? "block" : "hidden"}`}>
              <section>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col justify-center align-center gap-[10px]">
                    <p className="font-bold text-[32px] dark:text-[#FFF] md:text-[64px]">
                      {data.word}
                    </p>
                    {data &&
                      data.phonetics.find((phonetic) => phonetic.text)
                        ?.text && (
                        <span className="text-[18px] font-normal leading-6 text-[#A445ED] md:text-[24px]">
                          {
                            data.phonetics.find((phonetic) => phonetic.text)
                              ?.text
                          }
                        </span>
                      )}
                  </div>
                  <div>
                    {data &&
                      data.phonetics.find((phonetic) => phonetic.audio)
                        ?.audio && (
                        <audio
                          src={
                            data.phonetics.find((phonetic) => phonetic.audio)
                              ?.audio
                          }
                          ref={audioRef}
                        />
                      )}
                    <button
                      onClick={() => {
                        playAudio();
                      }}
                      className="flex hover:cursor-pointer group">
                      <svg
                        className="w-12 h-12 md:w-[75px] md:h-[75px] transition-colors duration-300 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="75"
                        height="75"
                        viewBox="0 0 75 75">
                        <g fill="#A445ED" fill-rule="evenodd">
                          <circle
                            className="group-hover:fill-[#A445ED] group-hover:opacity-100"
                            cx="37.5"
                            cy="37.5"
                            r="37.5"
                            opacity=".25"
                          />
                          <path
                            className="group-hover:fill-white"
                            d="M29 27v21l21-10.5z"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </section>
              {data &&
                data.meanings.map((meaning, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between my-8 gap-[20px]">
                      <h2 className="text-[18px] font-bold leading-normal italic dark:text-[#FFF] md:text-[24px]">
                        {meaning.partOfSpeech}
                      </h2>
                      <span className="w-[100%] h-[1px] bg-[#E9E9E9] dark:bg-[#3A3A3A]"></span>
                    </div>
                    <ul className="flex flex-col gap-y-[13px]">
                      <h3 className="text-4 text-[#757575] mb-2 md:text-[20px]">
                        Meaning
                      </h3>
                      {meaning.definitions.map((def, idx) => (
                        <li
                          className="flex flex-col items-left gap-y-1"
                          key={idx}>
                          {def.definition && (
                            <p className="flex gap-[10px] dark:text-[#FFF] md:text-[18px]">
                              <span className="pt-[9px]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="6"
                                  height="6"
                                  viewBox="0 0 5 5"
                                  fill="none">
                                  <circle
                                    cx="2.5"
                                    cy="2.5"
                                    r="2.5"
                                    fill="#8F19E8"
                                  />
                                </svg>
                              </span>
                              {def.definition}
                            </p>
                          )}

                          {def.example && (
                            <p className="w-[302px] pl-4 text-[15px] font-normal leading-6 text-[#757575] md:text-[18px]">
                              {`"${def.example}"`}
                            </p>
                          )}

                          {def.antonyms.length > 0 && (
                            <ul className="flex flex-wrap pl-4 gap-y-2 gap-x-4">
                              <h3 className="inline text-[#757575] font-normal pr-9 md:text-[20px]">
                                Antonyms
                              </h3>
                              {def.antonyms.map((ant, antIdx) => (
                                <li
                                  className="text-[#A445ED] text-base font-bold text-4 md:text-[20px]"
                                  key={antIdx}>
                                  {ant}
                                </li>
                              ))}
                            </ul>
                          )}
                          {def.synonyms.length > 0 && (
                            <ul className="flex flex-wrap pt-6 gap-y-2 gap-x-4">
                              <h3 className="inline text-[#757575] font-normal pr-9 md:text-[20px]">
                                Synonyms
                              </h3>
                              {def.synonyms.map((syn, synIdx) => (
                                <li
                                  className="text-[#A445ED] text-base font-bold text-4 md:text-[20px]"
                                  key={synIdx}>
                                  {syn}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              <span className="w-[100%] h-px bg-[#E9E9E9] dark:bg-[#3A3A3A] block my-8"></span>
              <footer className="pb-16 md:pb-[120px]">
                <div>
                  <p className="underline text-[14px] text-[#757575] font-normal mb-[10px]">
                    Source
                  </p>
                  <div className="flex items-center gap-1">
                    <a
                      className=" text-[14px] text-[#2D2D2D] underline font-normal dark:text-[#FFF]"
                      href={`${
                        data && data.sourceUrls && data.sourceUrls.length > 0
                          ? data.sourceUrls[0]
                          : "#"
                      }`}
                      target="_blank"
                      rel="noopener noreferrer">
                      $
                      {data && data.sourceUrls && data.sourceUrls.length > 0
                        ? data.sourceUrls[0]
                        : "#"}
                    </a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14">
                      <path
                        fill="none"
                        stroke="#838383"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
                      />
                    </svg>
                  </div>
                </div>
              </footer>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
