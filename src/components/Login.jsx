import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login as authStoreLogin } from '../store/authSlice';
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import authService from "../appWrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError(""); // Clear previous errors
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.CheckUser();
                if (userData) {
                    dispatch(authStoreLogin({ userData })); // Store user data in Redux
                    navigate("/"); // Redirect to home page after successful login
                }
            }
        } catch (error) {
            setError(error.message || "An error occurred during login.");
        }
    };

    return (
        <div className='flex items-center justify-center w-full pt-10 text-white font-bold'>
            <div className='mx-auto w-full max-w-lg bg-gray-900 rounded-xl p-10 border border-black/10'>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-green-600">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be valid"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                        <Button type="submit" className="w-full">Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
