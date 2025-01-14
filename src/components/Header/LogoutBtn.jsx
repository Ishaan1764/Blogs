import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appWrite/auth';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await authService.logout(); // Logout the user
            dispatch(logout()); // Dispatch logout action to clear Redux state
            navigate("/login"); // Redirect to login page after logout
        } catch (error) {
            console.log("Error during logout:", error);
        }
    };

    return (
        <button
            className="inline-block px-6 py-2 text-sm md:text-base font-semibold bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 ease-in-out"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
};

export default LogoutBtn;
