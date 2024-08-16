import React, { useState } from 'react';

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-700 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl px-4">
                    <img src="../../../static/images/logo.webp" alt="Logo" width="50" height="50"/>
                </div>
                
                {/* Hamburger menu button */}
                <button 
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {/* Desktop menu */}
                <ul className="hidden md:flex space-x-5">
                    <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
                    <li><a href="login" className="block text-white hover:text-gray-3000">Login</a></li>
                    { localStorage.getItem('isLoggedIn') === 'true' && (
                        <li><a href="logout" className="block text-white hover:text-gray-300">{localStorage.getItem('username')}</a></li>
                    )}

                </ul>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <ul className="md:hidden mt-4 space-y-2">
                    <li><a href="#" className="block text-white hover:text-gray-300">Home</a></li>
                    <li><a href="#" className="block text-white hover:text-gray-300">About</a></li>
                    <li><a href="login" className="block text-white hover:text-gray-300">Login</a></li>
                    { localStorage.getItem('isLoggedIn') === 'true' && (
                        <li><a href="logout" className="block text-white hover:text-gray-300">{localStorage.getItem('username')}</a></li>
                    )}
                </ul>
            )}
        </nav>
    )
}

export default Nav;