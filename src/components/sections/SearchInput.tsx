import {SearchIcon} from "../../icons/SearchIcon";

const SearchInput = ({query, setQuery}: {query: string; setQuery: (query: string) => void}) => {
  return (
    <div className="flex items-center gap-3.5 rounded-md bg-stone-800 px-4 py-2.5 ">
      <input
        className="flex-1 bg-stone-800 outline-none"
        placeholder="Search a section..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchIcon />
    </div>
  );
};

export default SearchInput;
