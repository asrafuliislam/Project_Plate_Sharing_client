import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import ImgLogo2 from '../assets/logo2.png';

const Navbar = () => {

    const { user, LogOut } = use(AuthContext);

    const handleSignOut = () => {
        LogOut()
            .then()
            .catch(error => {
                console.log(error);
            })
    }

    const activeLink = ({ isActive }) =>
        isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-500";

    const links = <>
        <li><NavLink to='/' className={activeLink}>Home</NavLink></li>
        <li><NavLink to='/availableFoods' className={activeLink}>Available Foods</NavLink></li>
        {user && <>
            <li><NavLink to='/manageMyFoods' className={activeLink}>My Foods</NavLink></li>
            <li><NavLink to='/myRequest' className={activeLink}>My Request</NavLink></li>
            <li><NavLink to='/addfood' className={activeLink}>Donate A Food</NavLink></li>
        </>}
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm lg:px-10" >

            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <div className="flex  font-bold justify-center items-center">
                    <span className="text-sky-600 text-2xl">Plate</span>
                    <div className="h-12 w-12 rounded-full mx-1 bg-sky-500 overflow-hidden">
                        <img
                            src={ImgLogo2}
                            className="h-full w-full m object-cover mix-blend-multiply"
                        />
                    </div>
                    <h2 className="text-xl">Sharing</h2>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <li onClick={handleSignOut} className="btn bg-sky-600 text-white"> Sign Out </li> :
                        <>
                            <li className='btn bg-sky-600 text-white mx-2'><NavLink to='/register'> Register</NavLink></li>
                            <li className='btn bg-sky-600 text-white mx-2'><NavLink to='/login'> LogIn </NavLink></li>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;