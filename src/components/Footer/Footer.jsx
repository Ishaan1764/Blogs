import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import Logo from '../Logo';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-2 md:py-4 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <div className="flex items-center mb-2 md:mb-0">
                    <Logo width="80px" />
                </div>
                <a
                    href="https://github.com/Ishaan1764/Blogs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-xxs md:text-xs text-center md:text-left hover:text-lime-400 transition duration-300"
                >
                    <Github size={16} />
                    <span>Have a look at the source code</span>
                </a>
                <ul className="flex flex-wrap justify-center md:justify-end space-x-2 mt-2 md:mt-0 text-xxs md:text-xs">
                    <li>
                        <Link className="text-gray-300 hover:text-lime-400 transition duration-300" to="/">
                            Terms
                        </Link>
                    </li>
                    <li>
                        <Link className="text-gray-300 hover:text-lime-400 transition duration-300" to="/">
                            Privacy
                        </Link>
                    </li>
                    <li>
                        <Link className="text-gray-300 hover:text-lime-400 transition duration-300" to="/">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
