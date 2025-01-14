import React, { useEffect, useState } from "react";
import appwriteService from "../appWrite/dbService";
import authService from "../appWrite/auth"
import { Container, PostCard } from "../components";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate=useNavigate()
    useEffect(() => {
        const checkUserAndFetchPosts = async () => {
            try {
                // Check if the user is logged in
                const loggedInUser = await authService.CheckUser();
                setUser(loggedInUser);

                if (loggedInUser) {
                    // Fetch posts if user is logged in
                    const response = await appwriteService.getAllActivePosts();
                    if (response?.documents) {
                        setPosts(response.documents);
                    } else {
                        setPosts([]);
                        
                    }
                }
            } catch (error) {
                console.log("Error checking user or fetching posts:", error);
                setUser(null);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        checkUserAndFetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Loading posts...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="w-full py-40 mt-4 text-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-6 w-full md:w-1/2 bg-gray-900 shadow-lg rounded-lg text-center">
                            <h1 className="text-3xl font-extrabold text-white mb-4">Please login to view posts</h1>
                            <p className="text-lg text-gray-300 mb-4">You need to be logged in to access the latest updates and posts.</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    if (posts.length === 0) {
        return (
            <div className="w-full py-40 mt-4 text-center bg-gradient-to-r from-gray-700 via-gray-800 to-black">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-6 w-full md:w-1/2 bg-gray-900 shadow-lg rounded-lg text-center">
                            <h1 className="text-3xl font-extrabold text-white mb-4">No posts available</h1>
                            <p className="text-lg text-gray-300 mb-4">There are currently no posts to display. Check back later for new updates.</p>
                            
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    

    return (
        <div className="w-full py-10">
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

export default HomePage;
