export default function AdminDashboardPage() {
    return (
      <div className="space-y-6 container mx-auto fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Quick stats and recent activity</p>
        </div>
  
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h2>
            <p className="text-2xl font-bold text-indigo-600">1,245</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Products</h2>
            <p className="text-2xl font-bold text-indigo-600">320</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Orders</h2>
            <p className="text-2xl font-bold text-indigo-600">87</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Categories</h2>
            <p className="text-2xl font-bold text-indigo-600">12</p>
          </div>
        </div>
      </div>
    );
  }
  