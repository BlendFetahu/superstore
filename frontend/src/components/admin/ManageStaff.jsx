import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  const token = localStorage.getItem("token");

  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;

    await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setStaff(staff.filter((u) => u.id !== id));
  };


const handleSave = async () => {
  const payload = {
    first_name: editingUser.first_name,
    last_name: editingUser.last_name,
    birthdate: editingUser.birthdate,
  };

  await axios.put(
    `http://localhost:5000/api/auth/users/${editingUser.id}`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  setStaff(
    staff.map((u) =>
      u.id === editingUser.id ? { ...u, ...payload } : u
    )
  );

  setEditingUser(null);
};




  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(185,28,28,0.45)] p-8">
      <h2 className="text-3xl font-extrabold text-red-700 mb-8 flex items-center gap-3">
        👥 Manage Staff
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 text-left">Name</th>
              <th className="py-3 text-left">Email</th>
              <th className="py-3 text-left">Birthdate</th>
              <th className="py-3 text-left">Role</th>
              <th className="py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 font-semibold">
                  {user.first_name} {user.last_name}
                </td>
                <td className="py-4 text-gray-600">{user.email}</td>
                <td className="py-4 text-gray-600">
                  {user.birthdate ? user.birthdate.slice(0, 10) : "-"}
                </td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>
                <td className="py-4 text-right space-x-2">
                  <button
                    onClick={() => setEditingUser({ ...user })}
                    className="px-4 py-2 rounded-xl bg-yellow-100 text-yellow-700 font-semibold hover:bg-yellow-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {staff.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-10 shadow-2xl animate-scaleIn">
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xl">
                ✏️
              </div>
              <h3 className="text-2xl font-black text-gray-800">
                Edit Staff Member
              </h3>
            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  First Name
                </label>
                <input
                  className="w-full mt-2 p-4 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-400 outline-none"
                  value={editingUser.first_name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, first_name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Last Name
                </label>
                <input
                  className="w-full mt-2 p-4 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-400 outline-none"
                  value={editingUser.last_name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, last_name: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                    EMAIL
                </label>
                <div className="px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium">
                    {editingUser.email}
                </div>
                </div>


              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Birthdate
                </label>
                <input
                  type="date"
                  className="w-full mt-2 p-4 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-400 outline-none"
                  value={editingUser.birthdate?.slice(0, 10) || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, birthdate: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setEditingUser(null)}
                className="px-8 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 rounded-xl bg-red-600 text-white font-black hover:bg-red-700 shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;
