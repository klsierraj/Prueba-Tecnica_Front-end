import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import { getUser } from '../services/searchUsersService';

// Mock del servicio `getUser`
jest.mock('../services/searchUsersService');

const mockUser = {
  login: 'user1',
  id: 1,
  avatar_url: 'https://example.com/avatar1.png',
  name: 'User One',
  bio: 'This is a bio',
};

describe('Profile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    render(
      <MemoryRouter initialEntries={['/user/user1']}>
        <Routes>
          <Route path="/user/:username" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders user profile data when loaded', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    render(
      <MemoryRouter initialEntries={['/user/user1']}>
        <Routes>
          <Route path="/user/:username" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    // Utilizar `waitFor` para esperar la actualización del estado
    await waitFor(() => expect(screen.getByText(mockUser.name)).toBeInTheDocument());
    expect(screen.getByAltText(`${mockUser.login} avatar`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.bio)).toBeInTheDocument();
  });

  test('renders error message on error', async () => {
    (getUser as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(
      <MemoryRouter initialEntries={['/user/user1']}>
        <Routes>
          <Route path="/user/:username" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    // Utilizar `waitFor` para esperar la actualización del estado
    await waitFor(() => expect(screen.getByText('Error fetching user profile')).toBeInTheDocument());
  });
});