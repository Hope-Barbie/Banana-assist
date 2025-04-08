// components/Admin/UserTable.tsx

interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
  }
  
  const mockUsers: User[] = [
    { id: 1, name: 'Alice Banana', email: 'alice@example.com', role: 'user' },
    { id: 2, name: 'Bob Tropica', email: 'bob@example.com', role: 'admin' },
    { id: 3, name: 'Charlie Peel', email: 'charlie@example.com', role: 'user' },
  ];
  
  export default function UserTable() {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-100 text-green-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-green-50 transition">
                <td className="px-6 py-4 text-sm">{user.id}</td>
                <td className="px-6 py-4 text-sm">{user.name}</td>
                <td className="px-6 py-4 text-sm">{user.email}</td>
                <td className="px-6 py-4 text-sm capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  