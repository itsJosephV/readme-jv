import {CancelIcon, SearchIcon} from "@/icons";

export const SearchInput = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3.5 rounded-md border border-stone-700 bg-stone-800 px-4 py-2.5">
      <input
        className="flex-1 bg-stone-800 caret-stone-400 outline-none placeholder:text-stone-500"
        placeholder="Search for a section"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length > 0 ? (
        <button onClick={() => setQuery("")}>
          <CancelIcon className="text-stone-400 transition-colors hover:text-inherit" />
        </button>
      ) : (
        <SearchIcon className="text-stone-400" />
      )}
    </div>
  );
};
