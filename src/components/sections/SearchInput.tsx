import {CancelIcon, SearchIcon} from "@/icons";

type InputProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const SearchInput = ({query, setQuery}: InputProps) => {
  return (
    <div className="flex items-center gap-3.5 rounded-md border border-zinc-100/10 bg-zinc-800 px-4 py-2.5">
      <input
        className="flex-1 bg-zinc-800 caret-inherit outline-none placeholder:text-zinc-500"
        placeholder="Search for a section"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length > 0 ? (
        <button onClick={() => setQuery("")}>
          <CancelIcon className="text-zinc-400 transition-colors hover:text-inherit" />
        </button>
      ) : (
        <SearchIcon className="text-zinc-400" />
      )}
    </div>
  );
};
