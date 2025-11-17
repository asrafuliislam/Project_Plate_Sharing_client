import React from 'react';
import { Link, NavLink } from 'react-router';
import ImgLogo2 from '../assets/logo2.png';
import Userimg from '../assets/user.png';
import UseAuth from '../hooks/UseAuth';

const Navbar = () => {

    const { user, LogOut } = UseAuth();
    const handleSignOut = () => {
        LogOut().catch(error => console.log(error));
    };

    const activeLink = ({ isActive }) =>
        isActive
            ? "text-sky-600 font-semibold"
            : "text-gray-700 hover:text-sky-500";

    const links = (
        <>
            <li><NavLink to="/" className={activeLink}>Home</NavLink></li>
            <li><NavLink to="/availableFoods" className={activeLink}>Available Foods</NavLink></li>

            {user && (
                <>
                    <li><NavLink to="/manageMyFoods" className={activeLink}>My Foods</NavLink></li>
                    <li><NavLink to="/myRequest" className={activeLink}>My Request</NavLink></li>
                    <li><NavLink to="/addfood" className={activeLink}>Donate Food</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 lg:px-12">

            <div className="navbar-start">

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>

                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>

                {/* Logo */}
                <div className="flex items-center justify-center font-bold  sm:flex">
                    <span className="text-sky-600 text-2xl">Plate</span>
                    <div className="h-12 w-12 mx-1 hidden sm:flex  rounded-full bg-sky-500 overflow-hidden">
                        <img
                            src={ImgLogo2}
                            className="h-full w-full object-cover mix-blend-multiply"
                        />
                    </div>
                    <span className="text-2xl">Sharing</span>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-3">
                    {links}
                </ul>
            </div>
            <div className="navbar-end flex items-center gap-2">

                {user ? (
                    <div className='flex items-center gap-3 relative'>
                        {/* Profile Image */}
                        <div className="relative group">
                            <img
                                src={user.image || Userimg}
                                alt={user.displayName || "User"}
                                className="h-10 w-10 rounded-full cursor-pointer"
                            />
                            {/* Hover Display Name */}
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-20 px-2 py-1 rounded bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                {user.displayName || user.email}
                            </span>
                        </div>

                        <button
                            onClick={handleSignOut}
                            className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <>
                        <NavLink to="/register"
                            className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white">
                            Register
                        </NavLink>

                        <NavLink to="/login"
                            className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white">
                            Log In
                        </NavLink>
                    </>
                )}

            </div>
        </div>
    );
};

export default Navbar;
