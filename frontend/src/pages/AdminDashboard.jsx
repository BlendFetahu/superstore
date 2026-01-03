import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    
    // State për të ndërruar faqet (Tabs)
    const [activeTab, setActiveTab] = useState('reports');

    // State për formën e regjistrimit
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleRegisterStaff = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register-staff', 
                { email, password, role: 'STAFF', first_name: firstName, last_name: lastName, birthdate: birthdate },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(`✅ ${res.data.message}`);
            setFirstName(''); setLastName(''); setBirthdate(''); setEmail(''); setPassword('');
        } catch (err) {
            setMessage(`❌ ${err.response?.data?.message || "Gabim"}`);
        }
    };

    return (
        <div className="flex h-screen bg-[#f8f9fc] font-sans text-gray-700">
            
            {/* SIDEBAR - Premium Dark Blue */}
            <aside className="w-72 bg-[#4e73df] bg-gradient-to-b from-[#4e73df] to-[#224abe] text-white flex flex-col shadow-xl">
                <div className="p-8 text-xl font-black tracking-widest flex items-center gap-3 italic">
                    <div className="bg-white p-1 rounded-rotate-12">
                        <span className="text-[#4e73df] text-2xl">⚡</span>
                    </div>
                    SUPERSTORE
                </div>

                <nav className="flex-1 px-4 mt-4">
                    <p className="text-[10px] font-bold text-blue-200 uppercase px-4 mb-2 opacity-60">Interface</p>
                    
                    <button 
                        onClick={() => setActiveTab('reports')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 mb-2 ${activeTab === 'reports' ? 'bg-white/20 shadow-inner font-bold' : 'hover:bg-white/10'}`}
                    >
                        <span>📊</span> Reports & Analytics
                    </button>

                    <button 
                        onClick={() => setActiveTab('register')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'register' ? 'bg-white/20 shadow-inner font-bold' : 'hover:bg-white/10'}`}
                    >
                        <span>👤</span> Register Staff
                    </button>

                    <div className="my-6 border-t border-white/10"></div>
                    <p className="text-[10px] font-bold text-blue-200 uppercase px-4 mb-2 opacity-60">Addons</p>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all opacity-50 cursor-not-allowed">
                        <span>📁</span> Tables (Coming Soon)
                    </button>
                </nav>

                <div className="p-6">
                    <button onClick={handleLogout} className="w-full bg-[#e74a3b] hover:bg-[#c0392b] text-white py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm">
                        LOGOUT
                    </button>
                </div>
            </aside>

            {/* CONTENT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Header me Shadow */}
                <header className="bg-white h-20 shadow-sm flex justify-between items-center px-10 z-10">
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h2>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
                            <span className="text-xl">🔔</span>
                        </div>
                        <div className="h-10 w-[1px] bg-gray-200 mx-2"></div>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <span className="text-sm font-medium group-hover:text-blue-600 transition">{role} Manager</span>
                            <img src="https://ui-avatars.com/api/?name=Admin&background=4e73df&color=fff" className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-blue-400 transition" alt="user" />
                        </div>
                    </div>
                </header>

                {/* Dinamic Body */}
                <main className="flex-1 overflow-y-auto p-10 bg-[#f8f9fc]">
                    
                    {/* PJESA E RAPORTEVE (Power BI) */}
                    {activeTab === 'reports' && (
                        <div className="animate-fadeIn">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 text-white">
                                <div className="bg-[#4e73df] p-6 rounded-2xl shadow-blue-200 shadow-xl flex justify-between items-center">
                                    <div><p className="text-xs opacity-80 uppercase font-bold">Earnings (Monthly)</p><p className="text-2xl font-black">$40,000</p></div>
                                    <span className="text-3xl opacity-30">📅</span>
                                </div>
                                <div className="bg-[#1cc88a] p-6 rounded-2xl shadow-green-200 shadow-xl flex justify-between items-center">
                                    <div><p className="text-xs opacity-80 uppercase font-bold">Earnings (Annual)</p><p className="text-2xl font-black">$215,000</p></div>
                                    <span className="text-3xl opacity-30">💵</span>
                                </div>
                                <div className="bg-[#36b9cc] p-6 rounded-2xl shadow-cyan-200 shadow-xl flex justify-between items-center">
                                    <div><p className="text-xs opacity-80 uppercase font-bold">New Staff Performance</p><p className="text-2xl font-black">85%</p></div>
                                    <span className="text-3xl opacity-30">🚀</span>
                                </div>
                                <div className="bg-[#f6c23e] p-6 rounded-2xl shadow-yellow-200 shadow-xl flex justify-between items-center">
                                    <div><p className="text-xs opacity-80 uppercase font-bold">Pending Orders</p><p className="text-2xl font-black">18</p></div>
                                    <span className="text-3xl opacity-30">⏳</span>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[500px] relative overflow-hidden">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-lg font-bold text-[#4e73df]">Real-time Sales Overview</h3>
                                    <button className="bg-[#4e73df] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">Download PDF</button>
                                </div>
                                {/* Power BI Embed Area */}
                                <div className="w-full h-[450px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group cursor-pointer hover:border-blue-300 transition-all">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">💹</div>
                                    <p className="text-gray-400 font-medium">Power BI Report is ready to be embedded</p>
                                    <p className="text-[10px] text-gray-300 mt-2 uppercase tracking-widest">Awaiting API Token</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PJESA E REGJISTRIMIT */}
                    {activeTab === 'register' && (
                        <div className="max-w-2xl mx-auto animate-fadeIn">
                            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                                <div className="text-center mb-10">
                                    <h3 className="text-2xl font-black text-gray-800">Add New Team Member</h3>
                                    <p className="text-gray-400 text-sm mt-2">Fill the credentials to create a new staff account</p>
                                </div>
                                
                                <form onSubmit={handleRegisterStaff} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">First Name</label>
                                            <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 transition" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Last Name</label>
                                            <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 transition" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Birthdate</label>
                                        <input type="date" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 transition" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Official Email</label>
                                        <input type="email" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 transition" placeholder="staff@superstore.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Secure Password</label>
                                        <input type="password" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 transition" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>

                                    <button className="w-full bg-[#4e73df] hover:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-100 transition-all hover:-translate-y-1 active:translate-y-0">
                                        CREATE ACCOUNT
                                    </button>
                                </form>
                                {message && (
                                    <div className={`mt-6 p-4 rounded-2xl text-center text-sm font-bold animate-bounce ${message.includes('✅') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {message}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;