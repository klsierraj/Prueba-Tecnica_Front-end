interface User {
    login: string;
    id: number;
    avatar_url: string;
    name?: string;
    bio?: string;
}

export const searchUsers = async (query: string): Promise<User[]> => {
    const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=10`);
    if (!response.ok) {
        throw new Error('Error fetching users');
    }
    const data = await response.json();
    return data.items;
};

export const getUser = async (login: string): Promise<User> => {
    const response = await fetch(`https://api.github.com/users/${login}`);
    if (!response.ok) {
        throw new Error('Error fetching user profile');
    }
    const user = await response.json();
    return user;
};
