import {useState} from "react";

import {MarkdownComponent as Markdown} from "./markdown";
import {MonacoComponent as Monaco} from "./monaco";
import Sections from "./sections/Sections";

// const draftArr = [
//   "## Some Title For Testing",
//   "`testing`",
//   "- [x] test\n- [x] test\n- [x] test",
//   "## TESTING",
//   "![logo](https://images.creativefabrica.com/products/previews/2023/11/03/hBzNwqaKv/2XfkTq4YIqVrr9jEiEezAuhvcsj-mobile.jpg)",
// ];

export interface DraftItemsProps {
  id: number;
  title: string;
  content: string;
}

const draftArrx = [
  {id: 1, title: "H1", content: "## Some Title For Testing"},
  {id: 2, title: "Code", content: "`testing`"},
  {id: 3, title: "Checkbox list", content: "- [x] test\n- [x] test\n- [x] test"},
  {id: 4, title: "H2", content: "## TESTING"},
  {
    id: 5,
    title: "Image",
    content:
      "![logo](https://images.creativefabrica.com/products/previews/2023/11/03/hBzNwqaKv/2XfkTq4YIqVrr9jEiEezAuhvcsj-mobile.jpg)",
  },
];

// eslint-disable-next-line react-refresh/only-export-components

export const extractContent = (array: DraftItemsProps[]) => array.map((item) => item.content);
//console.log(handleDrafts(draftArr));
function App() {
  const [sectionsData, setSectionsData] = useState<DraftItemsProps[]>(draftArrx);
  // const [updateSectionsData, setUpdatedSectionsData] = useState<DraftItemsProps[]>(draftArrx);
  const [currentDataIndex, setCurrentDataIndex] = useState<number>(0);

  function handleData(value: string | undefined) {
    if (value !== undefined) {
      const updatedData: DraftItemsProps[] = [...sectionsData];

      updatedData[currentDataIndex] = {
        ...updatedData[currentDataIndex],
        content: value,
      };
      setSectionsData(updatedData);
    }
  }

  console.log(sectionsData);

  return (
    <main className="grid min-h-screen grid-rows-[auto,1fr,auto] px-5 pb-5">
      <header className="text-xl font-bold capitalize leading-[4rem]">readme-jv</header>
      <div className="flex gap-3">
        <div className="flex-0 flex flex-col gap-2 rounded-md border border-stone-100/20 p-3">
          <Sections sectionsData={sectionsData} setCurrentDataIndex={setCurrentDataIndex} />
        </div>
        <div className="flex flex-1 gap-3">
          <div className="w-1/2 ">
            <Monaco data={sectionsData[currentDataIndex].content} onChange={handleData} />
          </div>
          <div className="flex-1">
            <Markdown data={sectionsData} />
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
