import OrderManagement from '@/components/admin/OrderManagement';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Order Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage customer orders and deliveries
        </p>
      </div>
      <OrderManagement />
    </div>
  );
}





