// app/admin/dashboard/page.tsx

function DashboardCard({ title, value }: { title: string; value: string | number }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-3xl font-bold text-green-600 mt-2">{value}</p>
      </div>
    );
  }
  
  export default function AdminDashboard() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-green-700">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <DashboardCard title="Total Users" value="150" />
          <DashboardCard title="Images Processed" value="320" />
          <DashboardCard title="Chat Sessions" value="80" />
        </div>
      </div>
    );
  }
  