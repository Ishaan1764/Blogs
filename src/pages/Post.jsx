import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appWrite/dbService";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    // Check if the logged-in user is the author of the post
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // Fetch post data based on slug
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    // Delete post and navigate to homepage
    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-3 bg-gray-900 text-white dark:bg-gray-800 dark:text-gray-100">
            <Container className='flex'>
                {/* Post Image */}
                <div className="w-full flex justify-center mb-6 relative border border-gray-700 rounded-xl p-2 bg-white shadow-lg dark:bg-gray-900 dark:border-gray-600 overflow-hidden">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl object-contain w-full max-w-2xl h-auto shadow-lg"
                    />

                    {/* Edit and Delete Buttons (Visible for Author) */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex space-x-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="px-4 py-2 text-white rounded-md">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="px-4 py-2 text-white rounded-md">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post Title */}
                <div className="w-full">
                    <h1 className="text-3xl font-bold text-gray-100 dark:text-gray-200">{post.title}</h1>
                </div>

                {/* Post Description */}
                <div className="browser-css text-gray-200 leading-relaxed text-lg dark:text-gray-300">
                    {parse(post.description)}
                </div>
            </Container>
        </div>
    ) : (
        <div className="text-center text-gray-500">Loading...</div>
    );
}
