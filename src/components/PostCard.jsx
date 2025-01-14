import React from 'react';
import dbService from "../appWrite/dbService";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PostCard = ({ $id, title, featuredImage, status, onStatusToggle }) => {
    const toggleStatus = async () => {
        const newStatus = status === 'active' ? 'inactive' : 'active';
        await dbService.updatePost($id, { status: newStatus });
        onStatusToggle($id, newStatus);
    };

    return (
        <Link to={`/post/${$id}`} className="group">
            <motion.div
                className="w-full bg-gray-800 rounded-xl p-4 transition-transform transform group-hover:scale-105 shadow-lg hover:shadow-2xl dark:bg-gray-700"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <div className="w-full flex  justify-center mb-4 overflow-hidden rounded-lg">
                    <motion.img
                        src={dbService.getFilePreview(featuredImage)}
                        alt={`Featured Image ${title}`}
                        className="w-full h-48 object-contain transition-opacity group-hover:opacity-90 rounded-xl"
                        whileHover={{ opacity: 0.85 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors dark:text-gray-200 dark:group-hover:text-indigo-300">
                    {title}
                </h2>
                <div className="flex justify-between items-center mt-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold ${status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {status}
                    </span>
                </div>
            </motion.div>
        </Link>
    );
};

export default PostCard;
