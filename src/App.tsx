import {MarkdownComponent as Markdown} from "./markdown";
import {MonacoComponent as Monaco} from "./monaco";
import Sections from "./sections/Sections";

function App() {
  return (
    <main className="grid min-h-screen grid-rows-[auto,1fr,auto] px-5 pb-5">
      <header className="text-xl font-bold capitalize leading-[4rem]">readme-jv</header>
      <div className="flex gap-3">
        <div className="flex-0 flex flex-col gap-2 rounded-md border border-stone-100/20 p-3">
          <Sections />
        </div>
        <div className="flex flex-1 gap-3">
          <div className="w-1/2 ">
            <Monaco />
          </div>
          <div className="flex-1">
            <Markdown />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
