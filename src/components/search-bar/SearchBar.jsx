import { Search } from "lucide-react";
import React from "react";

function SearchBar({text, setSearchInput }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full sm:w-full bg-transparent border rounded-xl flex items-center justify-center">
        <input
          type="text"
          className="w-4/5 h-14  focus:outline-none  bg-transparent"
          placeholder={text || "search a person"}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Search className="text-zinc-400  " />
      </div>
    </div>
  );
}

export default SearchBar;
