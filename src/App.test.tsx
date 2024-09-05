import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { SearchProvider } from './context/SearchContext';

// Crear un nuevo cliente de consultas para cada prueba
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('App Component', () => {
  test('renders Home page by default', async () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <SearchProvider>
          <App />
        </SearchProvider>
      </QueryClientProvider>
    );

    // Verificar que la página de inicio se renderiza por defecto
    expect(screen.getByText('Buscar Usuarios de GitHub')).toBeInTheDocument();
  });

  test('renders Profile page when navigating to /user/:username', async () => {
    window.history.pushState({}, 'Profile page', '/user/testuser');

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <SearchProvider>
          <App />
        </SearchProvider>
      </QueryClientProvider>
    );

    // Verificar que la página de perfil se renderiza correctamente
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});