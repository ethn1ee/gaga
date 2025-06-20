import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="grow flex items-center h-10 px-2 gap-2 bg-accent rounded-md border overflow-hidden">
      <SearchIcon size={20} className="text-muted-foreground" />
      <input
        type="text"
        className="grow outline-none border-none shadow-none"
      />
    </div>
  );
};

export default Search;
