import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface SearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const Search = ({ placeholder, onSearch }: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    // Update local query state when searchParams change
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    onSearch(term);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Debounce the search to avoid excessive URL updates
    clearTimeout((window as any).debounceTimer);
    (window as any).debounceTimer = setTimeout(() => {
      handleSearch(newQuery);
    }, 300); // Adjust the debounce delay as needed
  };

  return (
    <input
      type="text"
      className="border border-[#38bdf8] rounded text-white p-2 w-1/2"
      placeholder={placeholder}
      value={query}
      onChange={handleChange}
    />
  );
};

export default Search;
