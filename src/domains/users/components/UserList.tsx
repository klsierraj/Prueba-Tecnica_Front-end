import { Link } from 'react-router-dom';
import './UserList.scss';
import { User } from '../../../types/User';


interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <ul className="user-list">
            {users.map(user => (
                <li key={user.id} className="user-list-item">
                    <div className="user-content">
                        <div className="user-id">{user.id}</div>
                        <Link to={`/user/${user.login}`} className="user-link">{user.login}</Link>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
