import React, { useEffect, useState } from 'react';
import appwrieService from "../appWrite/dbService";
import { Container, PostCard } from '../components';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwrieService.getAllActivePosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);
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
        <div className='w-full py-8'>
            <Container>
                {/* Use responsive grid layout */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;
