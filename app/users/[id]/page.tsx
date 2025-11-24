interface Props {
  params: { id: string };
}

async function getUserData(id: string) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users: Record<string, { id: string; name: string; email: string; role: string }> = {
    "1": { id: "1", name: "John Doe", email: "john@truetrip.com", role: "Traveler" },
    "2": { id: "2", name: "Jane Smith", email: "jane@truetrip.com", role: "Guide" },
    "3": { id: "3", name: "Bob Johnson", email: "bob@truetrip.com", role: "Admin" },
  };
  
  return users[id] || null;
}

export default async function UserProfile({ params }: Props) {
  const { id } = params;
  const user = await getUserData(id);

  if (!user) {
    return (
      <main className="flex flex-col items-center mt-10">
        <h1 className="text-2xl font-bold text-red-600">User Not Found</h1>
        <p>No user found with ID: {id}</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <span> / </span>
          <span className="hover:text-blue-600 cursor-pointer">Users</span>
          <span> / </span>
          <span className="text-gray-800 font-medium">{user.name}</span>
        </nav>
        
        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700">User ID:</label>
            <p className="text-gray-900 mt-1">{user.id}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Name:</label>
            <p className="text-gray-900 mt-1">{user.name}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Email:</label>
            <p className="text-gray-900 mt-1">{user.email}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Role:</label>
            <p className="text-gray-900 mt-1">{user.role}</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-gray-500">
            This is a dynamic route. Try visiting /users/1, /users/2, etc.
          </p>
        </div>
      </div>
    </main>
  );
}