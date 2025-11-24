import Link from "next/link";

const users = [
  { id: "1", name: "John Doe", role: "Traveler" },
  { id: "2", name: "Jane Smith", role: "Guide" },
  { id: "3", name: "Bob Johnson", role: "Admin" },
];

export default function UsersList() {
  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6">TrueTrip Users</h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id} className="border-b pb-3 last:border-b-0">
              <Link 
                href={`/users/${user.id}`}
                className="text-blue-600 hover:text-blue-800 hover:underline block"
              >
                <span className="font-medium">{user.name}</span>
                <span className="text-sm text-gray-500 ml-2">({user.role})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}