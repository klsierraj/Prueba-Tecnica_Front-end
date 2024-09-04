import React from 'react';
import { Link } from 'react-router-dom';

interface User {
    login: string;
    id: number;
    avatar_url: string;
}

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    <img src={user.avatar_url} alt={`${user.login} avatar`} width="50" />
                    <Link to={`/user/${user.login}`}>{user.login}</Link>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
