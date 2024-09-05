import { useState } from 'react';
import './SearchBar.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() !== '') { 
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        placeholder="Introduce un nombre de usuario"
      />
      <button type="submit" className="search-button">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
