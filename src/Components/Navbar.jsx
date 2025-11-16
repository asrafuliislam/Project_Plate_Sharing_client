import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import ImgLogo2 from '../assets/logo2.png';

const Navbar = () => {

    const { user, LogOut } = use(AuthContext);

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
            
            {/* LEFT ─ Logo + Mobile Menu */}
            <div className="navbar-start">
                {/* Mobile Menu */}
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
                <div className="flex items-center font-bold">
                    <span className="text-sky-600 text-2xl">Plate</span>

                    <div className="h-12 w-12 mx-1 rounded-full bg-sky-500 overflow-hidden">
                        <img
                            src={ImgLogo2}
                            className="h-full w-full object-cover mix-blend-multiply"
                        />
                    </div>

                    <span className="text-xl">Sharing</span>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-3">
                    {links}
                </ul>
            </div>
            <div className="navbar-end flex items-center gap-2">

                {user ? (
                    <button
                        onClick={handleSignOut}
                        className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white">
                        Sign Out
                    </button>
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
