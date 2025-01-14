import React, { useState } from 'react';
import authService from "../appWrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const signup = async (data) => {
        setError(""); // Reset error state before trying to sign up
        try {
            // Step 1: Create the account
            const userData = await authService.createAccount(data);

            if (userData) {
                // Step 2: Check user details and login
                const loggedInUser = await authService.CheckUser();
                if (loggedInUser) {
                    // Step 3: Dispatch user data to Redux
                    dispatch(login(loggedInUser));
                    console.log("User logged in:", loggedInUser); // Debugging line to check the user
                    // Step 4: Navigate to home page
                    navigate("/");
                } else {
                    console.log("User not found after signup."); // Debugging line
                    setError("User not found after signup.");
                }
            } else {
                console.log("Error in account creation"); // Debugging line
                setError("Account creation failed.");
            }
        } catch (error) {
            console.error("Signup error:", error); // Debugging line
            setError(error.message); // Set error message if signup fails
        }
    };

    return (
        <div className="flex items-center justify-center pt-2 text-white font-semibold ">
            <div className={`mx-auto w-full max-w-lg bg-gray-900 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-green-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", { required: true })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
