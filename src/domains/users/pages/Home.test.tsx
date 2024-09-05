import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import { useSearch } from '../../../context/SearchContext';

// Mock del contexto de búsqueda
jest.mock('../../../context/SearchContext');

// Mockear el componente `Bar` de `react-chartjs-2`
jest.mock('react-chartjs-2', () => {
  const originalModule = jest.requireActual('react-chartjs-2');
  
  return {
    ...originalModule,
    Bar: (props: any) => <div data-testid="bar-chart-mock" {...props}></div>,
  };
});

const mockUsers = [
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

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    (useSearch as jest.Mock).mockReturnValue({
      users: [],
      isLoading: false,
      isError: false,
      handleSearch: jest.fn(),
    });

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText('Buscar Usuarios de GitHub')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Introduce un nombre de usuario')).toBeInTheDocument();
    expect(screen.getByText('Realiza una búsqueda para ver los resultados.')).toBeInTheDocument();
  });

  test('shows loader when loading', () => {
    (useSearch as jest.Mock).mockReturnValue({
      users: [],
      isLoading: true,
      isError: false,
      handleSearch: jest.fn(),
    });

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows error message when there is an error', () => {
    (useSearch as jest.Mock).mockReturnValue({
      users: [],
      isLoading: false,
      isError: true,
      handleSearch: jest.fn(),
    });

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText('Error al obtener los usuarios')).toBeInTheDocument();
  });

  test('renders users and bar chart when users are loaded', () => {
    (useSearch as jest.Mock).mockReturnValue({
      users: mockUsers,
      isLoading: false,
      isError: false,
      handleSearch: jest.fn(),
    });

    render(
      <Router>
        <Home />
      </Router>
    );

    mockUsers.forEach(user => {
      expect(screen.getByText(user.login)).toBeInTheDocument();
    });

    // Verificar que el componente BarChart se renderiza
    expect(screen.getByTestId('bar-chart-mock')).toBeInTheDocument();
  });

  
});