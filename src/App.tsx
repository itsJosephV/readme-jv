import {useState} from "react";

import {MarkdownComponent as Markdown} from "./markdown";
import {MonacoComponent as Monaco} from "./monaco";
import Sections from "./sections/Sections";

const draftArr = [
  "## Some Title For Testing",
  "`testing`",
  "- [x] test\n- [x] test\n- [x] test",
  "## TESTING",
  "![logo](https://images.creativefabrica.com/products/previews/2023/11/03/hBzNwqaKv/2XfkTq4YIqVrr9jEiEezAuhvcsj-mobile.jpg)",
];

// eslint-disable-next-line react-refresh/only-export-components
const handleDrafts = (arr: string[] | undefined) => {
  return arr ? arr.map((str) => `${str}\n`).join("") : undefined;
};

//console.log(handleDrafts(draftArr));
function App() {
  const [monacoData, setMonacoData] = useState<string[]>(draftArr);
  const [markdownData, setMarkdownData] = useState<string | undefined>(handleDrafts(draftArr));
  const [currentDataIndex, setCurrentDataIndex] = useState<number>(0);

  function handleData(value: string | undefined) {
    if (value !== undefined) {
      const updatedData = [...monacoData];

      updatedData[currentDataIndex] = value;
      setMonacoData(updatedData);
      setMarkdownData(handleDrafts(updatedData));
    }
  }

  return (
    <main className="grid min-h-screen grid-rows-[auto,1fr,auto] px-5 pb-5">
      <header className="text-xl font-bold capitalize leading-[4rem]">readme-jv</header>
      <div className="flex gap-3">
        <div className="flex-0 flex flex-col gap-2 rounded-md border border-stone-100/20 p-3">
          <Sections monacoData={monacoData} setCurrentDataIndex={setCurrentDataIndex} />
        </div>
        <div className="flex flex-1 gap-3">
          <div className="w-1/2 ">
            <Monaco data={monacoData[currentDataIndex]} onChange={handleData} />
          </div>
          <div className="flex-1">
            <Markdown data={markdownData} />
          </div>
        </div>
      </div>
      {/* <footer className="text-center leading-[4rem] opacity-70">
        © {new Date().getFullYear()} readme-jv
      </footer> */}
    </main>
  );
}

export default App;
