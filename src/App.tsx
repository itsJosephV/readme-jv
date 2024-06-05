import {MarkdownComponent as Markdown} from "./markdown";
import {MonacoComponent as Monaco} from "./monaco";
import Sections from "./sections/Sections";

function App() {
  return (
    <main className="grid h-screen grid-rows-[auto,1fr] px-5 pb-5">
      <header className="text-xl font-bold capitalize leading-[4rem]">readme-jv</header>
      <div className="grid grid-cols-[auto,1fr] gap-3">
        <div className="flex flex-col gap-2 rounded-md border border-stone-100/20 p-3">
          <Sections />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Monaco />
          <Markdown />
        </div>
      </div>
    </main>
  );
}

export default App;
