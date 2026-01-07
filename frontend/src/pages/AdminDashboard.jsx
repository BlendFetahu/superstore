import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ManageStaff from "../components/admin/ManageStaff";
import logo from "../../images/logo.svg";
import PowerBIPage from "../components/admin/PowerBIPage";




const AdminDashboard = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    
    // State për të ndërruar faqet (Tabs)
    const [activeTab, setActiveTab] = useState('executive');

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
             <aside className="w-72 bg-[#b91c1c] bg-gradient-to-b from-[#b91c1c] to-[#7f1d1d] text-white flex flex-col shadow-xl">
                <div className="p-8 text-xl font-black tracking-widest flex items-center gap-3 italic">
                    <div className="bg-white p-1 rounded-rotate-12">
                        <img
                            src={logo}
                            alt="Sales Metrics logo"
                            className="h-9 w-9"
                            />
                    </div>
                    SalesMetrics
                </div>

                <nav className="flex-1 px-4 mt-4">
                    <p className="text-[10px] font-bold text-blue-200 uppercase px-4 mb-2 opacity-60">Interface</p>

                    <button 
                        onClick={() => setActiveTab('register')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'register' ? 'bg-white/20 shadow-inner font-bold' : 'hover:bg-white/10'}`}
                    >
                        <span>👤</span> Register Staff
                    </button>

                    <button
                        onClick={() => setActiveTab('manage-staff')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                        ${activeTab === 'manage-staff'
                            ? 'bg-white/20 shadow-inner font-bold'
                            : 'hover:bg-white/10'}`}
                        >
                        <span className="text-lg">👥</span>
                        <span>Manage Staff</span>
                    </button>

                    <div className="my-6 border-t border-white/10"></div>
                    
                    <p className="text-[10px] font-bold text-blue-200 uppercase px-4 mb-2 opacity-60">
                        Analytics Pages
                    </p>

                    <button onClick={() => setActiveTab('executive')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${activeTab === 'analytics-overview' ? 'bg-white/20 shadow-inner font-bold' : 'hover:bg-white/10'}`}>
                    📊 Executive Overview
                    </button>

                    <button onClick={() => setActiveTab('customers')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${activeTab === 'analytics-customers' ? 'bg-white/20 shadow-inner font-bold' : 'hover:bg-white/10'}`}>
                    🧑‍🤝‍🧑 Customer Analysis
                    </button>

                    <button onClick={() => setActiveTab('category')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${activeTab === 'analytics-category' ? 'bg-white/20 shadow-inner font-bold' : 'hover:bg-white/10'}`}>
                    🏷 Category Performance
                    </button>

                    <button onClick={() => setActiveTab('products')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${activeTab === 'analytics-products' ? 'bg-white/20 shadow-inner font-bold' : 'hover:bg-white/10'}`}>
                    📦 Product Insights
                    </button>

                    <button onClick={() => setActiveTab('timeseries')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${activeTab === 'analytics-trends' ? 'bg-white/20 shadow-inner font-bold' : 'hover:bg-white/10'}`}>
                    📈 Time Series & Trends
                    </button>

                    <button onClick={() => setActiveTab('regional')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${activeTab === 'analytics-regions' ? 'bg-white/20 shadow-inner font-bold' : 'hover:bg-white/10'}`}>
                    🌍 Regional / Location Insights
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
                        <div className="h-10 w-[1px] bg-gray-200 mx-2"></div>
                        <div className="flex items-center gap-3 cursor-pointer group">
                              <span className="text-sm font-medium group-hover:text-red-700 transition">{role} Manager</span>
                            <img
                                src="https://ui-avatars.com/api/?name=Admin&background=b91c1c&color=fff"
                                className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-red-400 transition"
                                alt="user"
                                />
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
                                    <h3 className="text-lg font-bold text-[#b91c1c]">Real-time Sales Overview</h3>
                                    <button className="bg-[#b91c1c] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition">Download PDF</button>
                                </div>
                                {/* Power BI Embed Area */}
                                <div className="w-full h-[450px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group cursor-pointer hover:border-red-300 transition-all">
                                    <div className="w-16 h-16 bg-blue-50 text-red-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">💹</div>
                                    <p className="text-gray-400 font-medium">Power BI Report is ready to be embedded</p>
                                    <p className="text-[10px] text-gray-300 mt-2 uppercase tracking-widest">Awaiting API Token</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PJESA E REGJISTRIMIT */}
                    {activeTab === 'register' && (
                <div className="max-w-xl mx-auto animate-fadeIn">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-black text-gray-800">
                                Add New Team Member
                            </h3>
                            <p className="text-gray-400 text-xs mt-1">
                                Fill the credentials to create a new staff account
                            </p>
                        </div>

                        <form onSubmit={handleRegisterStaff} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-red-400 transition text-sm"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-red-400 transition text-sm"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
                                    Birthdate
                                </label>
                                <input
                                    type="date"
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:red-blue-400 transition text-sm"
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
                                    Official Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-red-400 transition text-sm"
                                    placeholder="staff@superstore.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
                                    Secure Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-red-400 transition text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button className="w-full bg-[#b91c1c] hover:bg-red-700 text-white py-3 rounded-xl font-black shadow-md shadow-blue-100 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm">
                                CREATE ACCOUNT
                            </button>
                        </form>

                        {message && (
                            <div
                                className={`mt-4 p-3 rounded-xl text-center text-xs font-bold animate-bounce ${
                                    message.includes('✅')
                                        ? 'bg-green-50 text-green-600'
                                        : 'bg-red-50 text-red-600'
                                }`}
                            >
                                {message}
                            </div>
                        )}
        </div>
    </div>
)}

                    

                     {/* PJESA MANAGE STAFF */}
                    {activeTab === 'manage-staff' && (
                        <div className="animate-fadeIn">
                            <ManageStaff />
                        </div>
                    )}
                    
                   
                    {activeTab === "executive" && (
                    <PowerBIPage
                        title="Executive Overview — KPI & Performance"
                        src="https://app.powerbi.com/reportEmbed?reportId=d86c72d8-da05-45fb-bffa-2074b5f79566&autoAuth=true&ctid=a7f9f46c-13e5-4ad6-97fd-87dcfb8bc2d5&pageName=ReportSection43a56abc92e901eda0b6"
                    />
                    )}

                     {activeTab === "customers" && (
                    <PowerBIPage
                        title="Customer Analysis — Segment & Profitability"
                        src="https://app.powerbi.com/reportEmbed?reportId=d86c72d8-da05-45fb-bffa-2074b5f79566&autoAuth=true&ctid=a7f9f46c-13e5-4ad6-97fd-87dcfb8bc2d5&pageName=ReportSection43a56abc92e901eda0b6"
                    />
                    )}

                    {activeTab === "category" && (
                    <PowerBIPage
                        title="Category Performance — Sales vs Profit"
                        src = "https://app.powerbi.com/reportEmbed?reportId=d86c72d8-da05-45fb-bffa-2074b5f79566&autoAuth=true&ctid=a7f9f46c-13e5-4ad6-97fd-87dcfb8bc2d5&pageName=ReportSection64c4fc1d3ea2877e097a"   
                    />
                    )}

                    {activeTab === "products" && (
                    <PowerBIPage
                        title="Product Insights — Top / Bottom Products"
                        src = "https://app.powerbi.com/reportEmbed?reportId=d86c72d8-da05-45fb-bffa-2074b5f79566&autoAuth=true&ctid=a7f9f46c-13e5-4ad6-97fd-87dcfb8bc2d5&pageName=ReportSection296bfdcf400725a20e84"
                    />
                    )}

                    {activeTab === "timeseries" && (
                    <PowerBIPage
                        title="Time Series & Trends — YoY & Seasonality"
                        src= "https://app.powerbi.com/reportEmbed?reportId=d86c72d8-da05-45fb-bffa-2074b5f79566&autoAuth=true&ctid=a7f9f46c-13e5-4ad6-97fd-87dcfb8bc2d5&pageName=ReportSection337e80940e791200de93"
                    />
                    )}

                    {activeTab === "regional" && (
                    <PowerBIPage
                        title="Regional & Location Insights — Geo Performance"
                        src="https://app.powerbi.com/reportEmbed?reportId=d86c72d8-da05-45fb-bffa-2074b5f79566&autoAuth=true&ctid=a7f9f46c-13e5-4ad6-97fd-87dcfb8bc2d5&pageName=ReportSectiondbfbd22076eb033ba57c"
                    />
                    )}

                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;