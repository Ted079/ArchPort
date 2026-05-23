import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../UI/icons/SeacrhIcon";
import { useGetProjectsWithFiltersQuery } from "../../store/api/projectSlice";
import { Link } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar1 = ({ placeholder = "What are you looking for?", className = "" }: SearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetProjectsWithFiltersQuery(
    { search: query },
    { skip: query.length < 2 } // не делаем запрос пока меньше 2 символов
  );

  const searchData = data?.projects ?? [];
  const showDropdown = isFocused && query.length >= 2;

  // Закрыть dropdown при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      setIsFocused(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLinkClick = () => {
    setIsFocused(false);
    setQuery("");
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      {/* Input */}
      <div className={`flex items-center px-5 py-3 bg-[#f3f3f6] rounded-full transition-all duration-200 ${
        isFocused ? "ring-2 ring-neutral-300 bg-white" : "hover:bg-white hover:ring-2 hover:ring-stone-100"
      }`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleEnter}
          placeholder={placeholder}
          className="flex-grow bg-transparent text-neutral-700 text-sm placeholder-neutral-400 focus:outline-none"
        />
        <button
          onClick={() => query.trim() && navigate(`/search?q=${encodeURIComponent(query)}`)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-500 hover:bg-stone-600 transition-colors ml-3 flex-shrink-0"
        >
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden z-50">
          {isLoading ? (
            <div className="px-5 py-4 text-sm text-neutral-400">Searching...</div>
          ) : searchData.length === 0 ? (
            <div className="px-5 py-4 text-sm text-neutral-400">No results for "{query}"</div>
          ) : (
            <>
              <div className="px-5 pt-3 pb-1 text-xs text-neutral-400 uppercase tracking-wider">
                Projects
              </div>
              {searchData.slice(0, 6).map((item) => (
                <Link
                  key={item._id}
                  to={`/details/${item._id}`}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-5 py-3 hover:bg-neutral-50 transition-colors group"
                >
                  <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
                    {item.title}
                  </span>
                  <span className="text-xs text-neutral-300 group-hover:text-neutral-400">
                    View →
                  </span>
                </Link>
              ))}
              {searchData.length > 6 && (
                <button
                  onClick={() => {
                    setIsFocused(false);
                    navigate(`/search?q=${encodeURIComponent(query)}`);
                  }}
                  className="w-full px-5 py-3 text-sm text-stone-500 hover:bg-neutral-50 border-t border-neutral-100 text-left transition-colors"
                >
                  See all {searchData.length} results →
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar1;