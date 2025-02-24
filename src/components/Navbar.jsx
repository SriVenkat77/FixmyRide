import { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { shallow } from 'zustand/shallow';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Navbar() {
    const navigate = useNavigate();
    const [isAuthenticated, logout, user] = useAuthStore(
        (state) => [state.isAuthenticated, state.logout, state.user],
        shallow
    );

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        const success = await logout(); 
        if (success) {
            navigate('/login', { replace: true });
        }
    };
    
    
    

    return (
        <div className="fixed top-0 left-0 w-full shadow-lg h-12 sm:h-16 z-50 bg-[#545454]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link to="/">
                    <div className="inline-flex items-center space-x-2">
                        <img src="/Fixmylogo2.png" alt="FixmyRide Logo" className="h-8 sm:h-12 w-8 sm:w-12" />
                        <span className="font-bold text-gray-400 text-md sm:text-xl">FixmyRide</span>
                    </div>
                </Link>

                {/* Desktop Navigation (Hidden on Small Screens) */}
                <div className="hidden sm:flex space-x-2">
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-2">
                            <Link to="/dashboard" className="rounded-md border px-3 py-2 text-sm font-semibold text-gray-400">
                                Dashboard
                            </Link>
                            <Link to="/dashboard/bookings" className="rounded-md border px-3 py-2 text-sm font-semibold text-gray-400">
                                Bookings
                            </Link>
                            <Link to="/profile" className="rounded-md border px-3 py-2 text-sm font-semibold text-gray-400">
                                {user?.name?.toUpperCase()}
                            </Link>
                            <button
                                type="button"
                                className="rounded-md border px-3 py-2 text-sm font-semibold text-gray-400"
                                onClick={handleLogout}
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="rounded-md border px-3 py-2 text-sm font-semibold text-black">
                                Get Started
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger Button (Hidden on Medium & Larger Screens) */}
                <button className="sm:hidden text-gray-400 text-2xl" onClick={() => setIsOpen(true)}>
                    <FaBars />
                </button>
            </div>

            {/* Mobile Sidebar Navigation (Only Shows on Small Screens) */}
            <div
                className={`fixed top-0 right-0 h-full w-[70%] sm:w-[400px] md:w-[600px]  bg-[#545454] shadow-lg transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 sm:hidden`}
            >
                {/* Close Button */}
                <button className="absolute top-4 right-4 text-gray-400 text-2xl" onClick={() => setIsOpen(false)}>
                    <FaTimes />
                </button>

                {/* Menu Items */}
                <div className="mt-16 flex flex-col space-y-4 px-6">
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="text-gray-400 text-md border-b text-center" onClick={() => setIsOpen(false)}>
                                Dashboard
                            </Link>
                            <Link to="/dashboard/bookings" className="text-gray-400 text-md border-b text-center" onClick={() => setIsOpen(false)}>
                                Bookings
                            </Link>
                            <Link to="/profile" className="text-gray-400 text-md border-b text-center" onClick={() => setIsOpen(false)}>
                                {user?.name?.toUpperCase()}
                            </Link>
                            <button
                                type="button"
                                className="text-gray-400 text-md border-b"
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="text-gray-400 text-lg py-2 border-b text-center" onClick={() => setIsOpen(false)}>
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
