import { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import { User } from '../types/User'; 
import { searchUsers } from '../domains/users/services/searchUsersService';

interface SearchContextType {
  query: string;
  users: User[];
  isLoading: boolean;
  isError: boolean;
  handleSearch: (searchQuery: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<string>('');

  const { data: users = [], isLoading, isError } = useQuery<User[]>({
    queryKey: ['users', query],
    queryFn: () => searchUsers(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.length < 4 || searchQuery.toLowerCase() === 'iseijasunow') {
      toast.error('La búsqueda debe tener al menos 4 caracteres y no puede ser "iseijasunow".');
      return;
    }
    setQuery(searchQuery);
  };

  return (
    <SearchContext.Provider value={{ query, users, isLoading, isError, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
