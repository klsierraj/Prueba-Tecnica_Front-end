import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { getUser } from '../services/searchUsersService';

interface User {
    login: string;
    id: number;
    avatar_url: string;
    name: string;
    bio: string;
    // Añade otros campos según sea necesario
}

const Profile: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!username) return;

            try {
                const fetchedUser = await getUser(username);
                setUser(fetchedUser);
                setError(null);
            } catch (err) {
                setError('Error fetching user profile');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    if (loading) return <Loader />;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {user && (
                <>
                    <h1>{user.name || user.login}</h1>
                    <img src={user.avatar_url} alt={`${user.login} avatar`} width="100" />
                    <p>{user.bio}</p>
                    {/* Aquí puedes agregar más información del usuario */}
                </>
            )}
        </div>
    );
};

export default Profile;
