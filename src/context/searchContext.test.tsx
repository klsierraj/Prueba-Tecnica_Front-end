import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { SearchProvider, useSearch } from './SearchContext';
import { searchUsers } from '../domains/users/services/searchUsersService';
import { User } from '../types/User';

// Mock de React Query y toast
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Mock de searchUsers
jest.mock('../domains/users/services/searchUsersService', () => ({
  searchUsers: jest.fn(),
}));

const mockUsers: User[] = [
  {
    id: 1,
    login: 'user1',
    avatar_url: 'https://example.com/avatar1.png',
    followers: 100,
  },
  {
    id: 2,
    login: 'user2',
    avatar_url: 'https://example.com/avatar2.png',
    followers: 150,
  },
];

const queryClient = new QueryClient();

const TestComponent = () => {
  const { handleSearch, query, users, isLoading, isError } = useSearch();

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <p>{`Query: ${query}`}</p>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
};

describe('SearchContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock de useQuery para devolver un estado inicial básico
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  test('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <TestComponent />
        </SearchProvider>
      </QueryClientProvider>
    );

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('handleSearch shows error toast on invalid input', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <TestComponent />
        </SearchProvider>
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'iseijasunow' } });

    expect(toast.error).toHaveBeenCalledWith(
      'La búsqueda debe tener al menos 4 caracteres y no puede ser "iseijasunow".'
    );
  });

  test('does not call searchUsers if query is less than 4 characters', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <TestComponent />
        </SearchProvider>
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'tes' } });

    expect(searchUsers).not.toHaveBeenCalled();
  });
});