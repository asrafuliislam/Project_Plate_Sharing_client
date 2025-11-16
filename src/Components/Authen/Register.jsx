import React, { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router';
import GoogleIcon from '../../assets/icons8-google-48.png'
const Register = () => {
    const { signInWithGoogle, createUser } = use(AuthContext);
    const navigate = useNavigate();

    const handleCreateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        createUser(email, password)
            .then(() => {
                const newUser = { name, email, image: photoURL };
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newUser),
                });
                navigate('/');
            })
            .catch((error) => console.log(error));
    };

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        signInWithGoogle()
            .then(result => {
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                };
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newUser)
                });
                navigate('/');
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
                
                {/* Header */}
                <div className="text-center p-6 bg-blue-600 text-white">
                    <h1 className="text-3xl font-bold mb-2">Register now!</h1>
                    <p className="text-sm text-white/90">Create your account to start sharing meals.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleCreateUser} className="p-6 space-y-4">

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name='name'
                            placeholder="Your Name"
                            required
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
                        <input
                            type="text"
                            name='photoURL'
                            placeholder="Photo URL"
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name='email'
                            placeholder="Email"
                            required
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                        />
                    </div>

                    <button
                        type='submit'
                        className="w-full py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Register Now
                    </button>

                    <div className="flex items-center">
                        <hr className="flex-1 border-gray-300"/>
                        <span className="px-3 text-gray-500 text-sm">OR</span>
                        <hr className="flex-1 border-gray-300"/>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-2 border rounded-xl py-2 hover:shadow-md transition bg-white text-gray-800"
                    >
                        <img src={GoogleIcon} alt="google" className='h-6' />
                        Register with Google
                    </button>
                    <p className="text-center text-gray-500 text-sm mt-4">
                        You have already account? <Link to='/login' className="text-blue-600 font-semibold cursor-pointer"> Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
