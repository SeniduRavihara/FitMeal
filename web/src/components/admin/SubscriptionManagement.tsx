'use client';

import { useState } from 'react';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  PauseIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const subscriptionPlans = [
  {
    id: 1,
    name: '3-Day Trial',
    duration: '3 days',
    mealsPerDay: 2,
    price: 29.99,
    originalPrice: 39.99,
    features: ['6 meals total', 'Free delivery', 'Nutrition tracking', 'Cancel anytime'],
    isPopular: false,
    activeSubscriptions: 45,
    totalRevenue: 1349.55,
    status: 'active',
  },
  {
    id: 2,
    name: 'Weekly Plan',
    duration: '7 days',
    mealsPerDay: 3,
    price: 69.99,
    originalPrice: 89.99,
    features: ['21 meals total', 'Free delivery', 'Nutrition tracking', 'Meal customization', 'Priority support'],
    isPopular: true,
    activeSubscriptions: 128,
    totalRevenue: 8958.72,
    status: 'active',
  },
  {
    id: 3,
    name: 'Monthly Plan',
    duration: '30 days',
    mealsPerDay: 3,
    price: 249.99,
    originalPrice: 329.99,
    features: ['90 meals total', 'Free delivery', 'Nutrition tracking', 'Meal customization', 'Priority support', 'Exclusive recipes', 'Personal nutritionist chat'],
    isPopular: false,
    activeSubscriptions: 67,
    totalRevenue: 16749.33,
    status: 'active',
  },
];

const customerSubscriptions = [
  {
    id: 1,
    customer: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    plan: 'Weekly Plan',
    startDate: '2024-01-15',
    endDate: '2024-01-22',
    status: 'active',
    mealsRemaining: 15,
    nextDelivery: '2024-01-23',
    totalPaid: 69.99,
  },
  {
    id: 2,
    customer: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    plan: 'Monthly Plan',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    status: 'active',
    mealsRemaining: 45,
    nextDelivery: '2024-01-24',
    totalPaid: 249.99,
  },
  {
    id: 3,
    customer: 'Mike Chen',
    email: 'mike.chen@email.com',
    plan: '3-Day Trial',
    startDate: '2024-01-15',
    endDate: '2024-01-18',
    status: 'expired',
    mealsRemaining: 0,
    nextDelivery: null,
    totalPaid: 29.99,
  },
  {
    id: 4,
    customer: 'Emma Davis',
    email: 'emma.davis@email.com',
    plan: 'Weekly Plan',
    startDate: '2024-01-10',
    endDate: '2024-01-17',
    status: 'paused',
    mealsRemaining: 8,
    nextDelivery: null,
    totalPaid: 69.99,
  },
];

export default function SubscriptionManagement() {
  const [activeTab, setActiveTab] = useState('plans');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('plans')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'plans'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Subscription Plans
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'customers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Customer Subscriptions
          </button>
        </nav>
      </div>

      {/* Subscription Plans Tab */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Subscription Plans</h2>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Plan
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className={`rounded-lg border-2 p-6 ${
                plan.isPopular ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  {plan.isPopular && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Popular
                    </span>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                    {plan.originalPrice && (
                      <span className="ml-2 text-lg text-gray-500 line-through">${plan.originalPrice}</span>
                    )}
                    <span className="ml-2 text-sm text-gray-500">/{plan.duration}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{plan.mealsPerDay} meals per day</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Active Subscriptions</p>
                      <p className="font-semibold text-gray-900">{plan.activeSubscriptions}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Revenue</p>
                      <p className="font-semibold text-gray-900">${plan.totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    plan.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {plan.status}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Subscriptions Tab */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Customer Subscriptions</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search customers..."
                className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <select className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Paused</option>
                <option>Expired</option>
              </select>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Meals Remaining
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Delivery
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{subscription.customer}</div>
                          <div className="text-sm text-gray-500">{subscription.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subscription.plan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(subscription.startDate).toLocaleDateString()} - {new Date(subscription.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subscription.mealsRemaining}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subscription.nextDelivery ? new Date(subscription.nextDelivery).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          subscription.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : subscription.status === 'paused'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subscription.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {subscription.status === 'active' ? (
                            <button className="text-yellow-600 hover:text-yellow-900">
                              <PauseIcon className="h-4 w-4" />
                            </button>
                          ) : (
                            <button className="text-green-600 hover:text-green-900">
                              <PlayIcon className="h-4 w-4" />
                            </button>
                          )}
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




