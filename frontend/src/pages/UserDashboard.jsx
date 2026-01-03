import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchOrders();
        }, 500); // Kërkon 500ms pasi përdoruesi ndalon shkrimin (Debounce)

        return () => clearTimeout(delayDebounceFn);
    }, [page, searchTerm]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5001/api/orders/all?page=${page}&limit=20&search=${searchTerm}`);
            setOrders(response.data.orders);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Gabim:", error);
        }
        setLoading(false);
    };

    const handleShipModeChange = async (orderId, newMode) => {
        try {
            await axios.put(`http://localhost:5001/api/orders/update/${orderId}`, { ship_mode: newMode });
            setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, ship_mode: newMode } : o));
            setMessage(`U ruajt: ${orderId}`);
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            alert("Gabim gjatë ruajtjes!");
        }
    };

    const getBadgeColor = (mode) => {
        switch(mode) {
            case 'First Class': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Second Class': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Same Day': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            {message && (
                <div className="fixed top-5 right-5 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    ✨ {message}
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header & Search Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Superstore Orders</h1>
                        <p className="text-slate-500 font-medium">Menaxhimi i dataset-it prej 51,000+ porosive</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <input 
                            type="text"
                            placeholder="Kërko ID ose Klientin..."
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-700"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                        />
                        <svg className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                
                {/* Table Section */}
                <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-slate-200">
                    <table className="min-w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                                <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                                <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Order Date</th>
                                <th className="px-8 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Shipping Method</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="4" className="text-center py-20 text-slate-400 animate-pulse">Duke kërkuar në databazë...</td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan="4" className="text-center py-20 text-slate-500">Nuk u gjet asnjë rezultat për "{searchTerm}"</td></tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.order_id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-8 py-5 text-sm font-bold text-blue-600 italic">#{order.order_id}</td>
                                        <td className="px-8 py-5 text-sm font-semibold text-slate-700">{order.customer_name}</td>
                                        <td className="px-8 py-5 text-sm text-slate-500 font-mono">
                                            {new Date(order.order_date).toLocaleDateString('sq-AL')}
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <select 
                                                value={order.ship_mode} 
                                                onChange={(e) => handleShipModeChange(order.order_id, e.target.value)}
                                                className={`w-44 border-2 rounded-xl px-3 py-2 text-[11px] font-black uppercase tracking-tighter cursor-pointer transition-all focus:outline-none ${getBadgeColor(order.ship_mode)}`}
                                            >
                                                <option value="Standard Class">Standard Class</option>
                                                <option value="Second Class">Second Class</option>
                                                <option value="First Class">First Class</option>
                                                <option value="Same Day">Same Day</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modern Pagination */}
                <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <button 
                        disabled={page === 1 || loading} 
                        onClick={() => setPage(page - 1)}
                        className="px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl disabled:opacity-20 transition-all"
                    >
                        ← Mbrapa
                    </button>
                    
                    <span className="text-sm font-bold text-slate-800 bg-slate-100 px-4 py-2 rounded-lg">
                        Faqja {page} nga {totalPages}
                    </span>

                    <button 
                        disabled={page === totalPages || loading} 
                        onClick={() => setPage(page + 1)}
                        className="px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl disabled:opacity-20 transition-all"
                    >
                        Para →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;