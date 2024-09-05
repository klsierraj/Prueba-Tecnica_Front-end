import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserList from './UserList';
import { User } from '../../../types/User';

// Mock de usuarios
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

describe('UserList Component', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <UserList users={mockUsers} />
      </Router>
    );

    const userItems = screen.getAllByRole('listitem');
    expect(userItems).toHaveLength(mockUsers.length);
  });

  test('renders user ids and logins correctly', () => {
    render(
      <Router>
        <UserList users={mockUsers} />
      </Router>
    );

    // Verifica que los ids de los usuarios se rendericen correctamente
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.id.toString())).toBeInTheDocument();
      expect(screen.getByText(user.login)).toBeInTheDocument();
    });
  });

  test('renders user links correctly', () => {
    render(
      <Router>
        <UserList users={mockUsers} />
      </Router>
    );

    // Verifica que los enlaces se rendericen correctamente y apunten a la URL correcta
    mockUsers.forEach((user) => {
      const userLink = screen.getByRole('link', { name: user.login });
      expect(userLink).toHaveAttribute('href', `/user/${user.login}`);
    });
  });
});