import React, { useEffect, useState } from 'react';
import appwrieService from "../appWrite/dbService";
import authService from "../appWrite/auth"; // Import AuthService
import { Container, PostCard } from '../components';

const ActiveInActivePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Get the current authenticated user's details
                const user = await authService.CheckUser();
                if (user) {
                    const userId = user.$id; // Get userId from the authenticated user object
                    // Fetch posts for the authenticated user
                    const response = await appwrieService.getAllActiveAndInactivePosts(userId);
                    if (response) {
                        setPosts(response); // Set the posts directly
                    }
                } else {
                    setError("User not authenticated");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Error fetching posts");
            } finally {
                setLoading(false); // Stop loading after data is fetched or an error occurs
            }
        };

        fetchPosts();
    }, []); // Empty dependency array to run only once on mount

    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }

    if (error) {
        return <div>{error}</div>; // Display error state
    }

    return (
        <div className="w-full h-auto py-8">
            <Container>
                {/* Flexbox layout with responsive wrapping */}
                <div className="flex flex-wrap justify-between">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default ActiveInActivePosts;
