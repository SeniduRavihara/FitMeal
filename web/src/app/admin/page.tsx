import {
  DashboardStats,
  PopularMeals,
  RecentOrders,
  RevenueChart,
} from "@/features/dashboard";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your FitMeal admin dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart />
        <PopularMeals />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}
