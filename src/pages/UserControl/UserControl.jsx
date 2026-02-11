import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const UserControl = () => {
  const { allUsersData, user } = useContext(AuthContext);

  // Ensure array safely
  const safeUsers = Array.isArray(allUsersData) ? allUsersData : [];

  console.log("Users:", safeUsers);

  const handleMakeAdmin = async (email) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_Link}/users/admin/${email}`,
        { method: "PATCH" }
      );

      if (res.ok) {
        Swal.fire("Success", "User promoted to admin", "success");
        window.location.reload(); // temporary reliable refresh
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not make admin", "error");
    }
  };

  const handleRemoveAdmin = async (email) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_Link}/users/remove-admin/${email}`,
        { method: "PATCH" }
      );

      if (res.ok) {
        Swal.fire("Success", "Admin rights removed", "success");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not remove admin", "error");
    }
  };

  const handleDeleteUser = async (email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_Link}/users/${email}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        Swal.fire("Deleted!", "User removed successfully", "success");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not delete user", "error");
    }
  };
  console.log(safeUsers)

  // Loading state
  if (!safeUsers) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          User Management
        </h1>

        {safeUsers.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No users found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {safeUsers.map((u, index) => (
                  <tr
                    key={u.email || index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{u.name}</td>
                    <td className="p-3 text-gray-600">{u.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          u.isAdmin
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {u.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="p-3 space-x-2 flex flex-wrap">
                      {!u.isAdmin && (
                        <button
                          onClick={() => handleMakeAdmin(u.email)}
                          className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600"
                        >
                          Make Admin
                        </button>
                      )}

                      {u.isAdmin && user?.email !== u.email && (
                        <button
                          onClick={() => handleRemoveAdmin(u.email)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-xs hover:bg-yellow-600"
                        >
                          Remove
                        </button>
                      )}

                      {user?.email !== u.email && (
                        <button
                          onClick={() => handleDeleteUser(u.email)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserControl;
