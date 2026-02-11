import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const AdminControl = () => {
  const { allUsersData, user } = useContext(AuthContext) || {};
  const [refresh, setRefresh] = useState(false);

  // Safety: ensure array
  const safeUsers = Array.isArray(allUsersData) ? allUsersData : [];

  // Filter only admins
  const adminUsers = useMemo(() => {
    return safeUsers.filter((u) => u.isAdmin === true);
  }, [safeUsers, refresh]);

  const handleRemoveAdmin = async (email) => {
    if (email === user?.email) {
      Swal.fire("Warning", "You cannot remove yourself!", "warning");
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove admin privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      confirmButtonText: "Yes, remove",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_Link}/users/remove-admin/${email}`,
        { method: "PATCH" }
      );

      if (res.ok) {
        Swal.fire("Success", "Admin rights removed", "success");
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not remove admin", "error");
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Admin Control
      </h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No Admin Found
                  </td>
                </tr>
              ) : (
                adminUsers.map((admin, index) => (
                  <tr
                    key={admin.email}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{admin.name}</td>
                    <td className="p-4 text-gray-600">{admin.email}</td>
                    <td className="p-4">
                      {user?.email !== admin.email ? (
                        <button
                          onClick={() => handleRemoveAdmin(admin.email)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-md text-xs hover:bg-yellow-600"
                        >
                          Remove Admin
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">
                          You
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminControl;
