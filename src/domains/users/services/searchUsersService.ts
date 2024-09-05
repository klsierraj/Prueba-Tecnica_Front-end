import { User } from "../../../types/User";


export const searchUsers = async (query: string): Promise<User[]> => {
    try {
        const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=10`);
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        const data = await response.json();
        
        const usersWithFollowers = await Promise.all(
            data.items.map(async (user: User) => {
                try {
                    const userDetailsResponse = await fetch(`https://api.github.com/users/${user.login}`);
                    if (!userDetailsResponse.ok) {
                        throw new Error('Error fetching user details');
                    }
                    const userDetails = await userDetailsResponse.json();
                    return { ...user, followers: userDetails.followers };
                } catch {
                    return { ...user, followers: 0 }; 
                }
            })
        );

        return usersWithFollowers;
    } catch (error) {
        console.error('Error in searchUsers:', error);
        throw error;
    }
};

export const getUser = async (login: string): Promise<User> => {
    const response = await fetch(`https://api.github.com/users/${login}`);
    if (!response.ok) {
        throw new Error('Error fetching user profile');
    }
    const user = await response.json();
    return user;
};
