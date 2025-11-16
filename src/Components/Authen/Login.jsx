import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import GoogleIcon from '../../assets/icons8-google-48.png'


const Login = () => {
    const { signInWithGoogle, signInUser } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(res => {
                navigate(from, { replace: true });
                const userEmail = { email: res.user.email };
                fetch('https://community-food-sharing-server-azure.vercel.app/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userEmail)
                });
            })
            .catch(err => console.log(err));
    };

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        signInWithGoogle()
            .then(result => {
                navigate(from, { replace: true });
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                };
                fetch('https://community-food-sharing-server-azure.vercel.app/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newUser)
                });
            })
            .catch(error => console.log(error));
    };

    return (
        <div className=" min-h-screen  flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Header */}
                <div className="btn-primary text-white p-8 text-center">
                    <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
                    <p className="text-sm text-white/90">Sign in to continue to Plate Sharing</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="p-8 space-y-6">
                    
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name='email'
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                        />
                    </div>

                    {/* Sign In Button */}
                    <button
                        type='submit'
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                    <div className="flex items-center">
                        <hr className="flex-1 border-gray-300"/>
                        <span className="px-3 text-gray-500 text-sm">OR</span>
                        <hr className="flex-1 border-gray-300"/>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-2 border rounded-xl py-3 hover:shadow-md transition bg-white text-gray-800"
                    >
                        <img src={GoogleIcon} alt="google" className='h-6' />
                        Sign in with Google
                    </button>

                    {/* Register Link */}
                    <p className="text-center text-gray-500 text-sm mt-4">
                        Don't have an account? <Link to='/register' className="text-blue-600 font-semibold cursor-pointer"> Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
