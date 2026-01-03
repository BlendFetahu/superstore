import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            if (response.data.role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (response.data.role === 'STAFF') {
                // KETU: Perdorim emrin e rruges per UserDashboard
                navigate('/user-dashboard'); 
            }
        } catch (err) {
            setError(err.response?.data?.message || "Email ose fjalëkalim i gabuar!");
        }
    };

    return (
        <div className="h-full bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">SalesMetrics</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="stafi1@superstore.com"
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-500 transition font-semibold">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;