"use client";
import { useEffect, useState } from "react";
interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}
export default function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setUsers(data.users);
      setError("");
    } catch {
      setError("Access denied or failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setLoading(true);
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    });
    fetchUsers();
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setLoading(true);
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  function RoleControl({ user }: { user: User }) {
    const [updating, setUpdating] = useState(false);
    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newRole = e.target.value;
      setUpdating(true);
      await fetch("/api/admin/users/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, newRole }),
      });
      setUpdating(false);
    };
    return (
      <select
        value={user.role}
        onChange={handleChange}
        disabled={updating}
        className="border px-2 py-1"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    );
  }

  return (
    <main className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <input
        type="text"
        placeholder="Search by email, name, or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-600">{error}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3">Email</th>
            <th className="text-left py-2 px-3">Name</th>
            <th className="text-left py-2 px-3">Role</th>
            <th className="text-left py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-3">{user.email}</td>
              <td className="py-2 px-3">{user.name}</td>
              <td className="py-2 px-3"><RoleControl user={user} /></td>
              <td className="py-2 px-3 flex gap-2">
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
} 