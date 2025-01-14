import React, { useState } from 'react';
import Container from '../container/Container';
import Logo from '../Logo';
import LogoutBtn from './LogoutBtn';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../appWrite/auth';
import { Menu, X } from 'lucide-react'; // Import hamburger and close icons from lucide-react

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // Track if the menu is open on mobile

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
        { name: 'All Posts', slug: '/all-posts', active: authStatus },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
        { name: 'Your Posts', slug: '/allactiveinactive-posts', active: authService }
    ];

    return (
        <header className="w-full bg-gray-900 text-gray-300 py-4 shadow-md sticky top-0 z-50">
            <Container>
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="80px" />
                        </Link>
                    </div>

                    {/* Hamburger menu for small screens */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Desktop navigation */}
                    <ul className="hidden lg:flex space-x-6 text-sm md:text-base">
                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className="px-4 py-2 rounded-full hover:bg-lime-500 hover:text-gray-900 transition duration-300"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>

                    {/* Mobile navigation */}
                    {menuOpen && (
                        <ul className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 text-center py-4 space-y-4">
                            {navItems.map(
                                (item) =>
                                    item.active && (
                                        <li key={item.name}>
                                            <button
                                                onClick={() => {
                                                    navigate(item.slug);
                                                    setMenuOpen(false); // Close menu after selection
                                                }}
                                                className="px-4 py-2 w-full text-gray-300 hover:bg-lime-500 hover:text-gray-900 transition duration-300"
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    )
                            )}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    )}
                </nav>
            </Container>
        </header>
    );
};

export default Header;
