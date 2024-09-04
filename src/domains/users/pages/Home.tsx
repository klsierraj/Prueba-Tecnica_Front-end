// src/domains/users/pages/Home.tsx
import React, { useState } from 'react';
import SearchBar from '../../../components/SearchBar';
import UserList from '../components/UserList';
import Loader from '../../../components/Loader';
import { searchUsers } from '../services/searchUsersService';

interface User {
    login: string;
    id: number;
    avatar_url: string;
}

const Home: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async (query: string) => {
        if (query.length < 4 || query.toLowerCase() === 'iseijasunow') {
            alert('La búsqueda debe tener al menos 4 caracteres y no puede ser "iseijasunow".');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const fetchedUsers = await searchUsers(query);
            setUsers(fetchedUsers);
        } catch (err) {
            setError('Error fetching users');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Buscar Usuarios de GitHub</h1>
            <SearchBar onSearch={handleSearch} />
            {loading ? (
                <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <UserList users={users} />
            )}
        </div>
    );
};

export default Home;
