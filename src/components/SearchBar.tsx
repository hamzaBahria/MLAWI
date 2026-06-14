import React, { memo } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const SearchBar = memo(function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un supplément…"
        className="
          w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-600
          bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          text-base focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all
        "
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
          aria-label="Effacer"
        >
          ✕
        </button>
      )}
    </div>
  );
});

export default SearchBar;
