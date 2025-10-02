'use client';

import { useState } from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  TruckIcon,
  EyeIcon,
  PencilIcon 
} from '@heroicons/react/24/outline';

const orders = [
  {
    id: 'ORD-001',
    customer: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    items: [
      { name: 'Grilled Chicken & Quinoa Bowl', quantity: 2, price: 14.99 },
      { name: 'Mediterranean Salmon', quantity: 1, price: 18.99 },
    ],
    total: 48.97,
    deliveryFee: 2.99,
    tax: 4.16,
    grandTotal: 56.12,
    status: 'delivered',
    paymentMethod: 'Visa **** 1234',
    deliveryAddress: '123 Main Street, San Francisco, CA 94102',
    orderDate: '2024-01-20T12:00:00',
    deliveryDate: '2024-01-20T18:15:00',
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    items: [
      { name: 'Vegan Buddha Bowl', quantity: 2, price: 12.99 },
    ],
    total: 25.98,
    deliveryFee: 2.99,
    tax: 2.32,
    grandTotal: 31.29,
    status: 'preparing',
    paymentMethod: 'Mastercard **** 5678',
    deliveryAddress: '456 Oak Avenue, San Francisco, CA 94103',
    orderDate: '2024-01-20T14:30:00',
    deliveryDate: null,
  },
  {
    id: 'ORD-003',
    customer: 'Mike Chen',
    email: 'mike.chen@email.com',
    items: [
      { name: 'Keto Beef Stir-Fry', quantity: 4, price: 16.99 },
    ],
    total: 67.96,
    deliveryFee: 0,
    tax: 5.44,
    grandTotal: 73.40,
    status: 'out_for_delivery',
    paymentMethod: 'PayPal',
    deliveryAddress: '789 Pine Street, San Francisco, CA 94104',
    orderDate: '2024-01-20T16:00:00',
    deliveryDate: null,
  },
  {
    id: 'ORD-004',
    customer: 'Emma Davis',
    email: 'emma.davis@email.com',
    items: [
      { name: 'Grilled Chicken & Quinoa Bowl', quantity: 1, price: 14.99 },
    ],
    total: 14.99,
    deliveryFee: 2.99,
    tax: 1.44,
    grandTotal: 19.42,
    status: 'cancelled',
    paymentMethod: 'Visa **** 9012',
    deliveryAddress: '321 Elm Street, San Francisco, CA 94105',
    orderDate: '2024-01-20T15:10:00',
    deliveryDate: null,
  },
];

const statusConfig = {
  pending: {
    icon: ClockIcon,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    label: 'Pending',
  },
  confirmed: {
    icon: CheckCircleIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    label: 'Confirmed',
  },
  preparing: {
    icon: ClockIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    label: 'Preparing',
  },
  out_for_delivery: {
    icon: TruckIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    label: 'Out for Delivery',
  },
  delivered: {
    icon: CheckCircleIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    label: 'Delivered',
  },
  cancelled: {
    icon: XCircleIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    label: 'Cancelled',
  },
};

export default function OrderManagement() {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <span className="text-sm text-gray-500">
            {filteredOrders.length} orders
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search orders..."
            className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
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
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items[0].name}
                        {order.items.length > 1 && ` +${order.items.length - 1} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.grandTotal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



