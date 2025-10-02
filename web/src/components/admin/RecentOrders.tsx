import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Alex Johnson',
    items: 3,
    total: 45.97,
    status: 'delivered',
    date: '2024-01-20',
    time: '18:30',
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Wilson',
    items: 2,
    total: 32.98,
    status: 'preparing',
    date: '2024-01-20',
    time: '17:45',
  },
  {
    id: 'ORD-003',
    customer: 'Mike Chen',
    items: 4,
    total: 67.96,
    status: 'out_for_delivery',
    date: '2024-01-20',
    time: '16:20',
  },
  {
    id: 'ORD-004',
    customer: 'Emma Davis',
    items: 1,
    total: 14.99,
    status: 'cancelled',
    date: '2024-01-20',
    time: '15:10',
  },
  {
    id: 'ORD-005',
    customer: 'David Brown',
    items: 2,
    total: 29.98,
    status: 'delivered',
    date: '2024-01-20',
    time: '14:30',
  },
];

const statusConfig = {
  delivered: {
    icon: CheckCircleIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    label: 'Delivered',
  },
  preparing: {
    icon: ClockIcon,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    label: 'Preparing',
  },
  out_for_delivery: {
    icon: ClockIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    label: 'Out for Delivery',
  },
  cancelled: {
    icon: XCircleIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    label: 'Cancelled',
  },
};

export default function RecentOrders() {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
      </div>
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date} {order.time}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}




