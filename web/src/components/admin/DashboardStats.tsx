import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    changeType: 'positive',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Total Orders',
    value: '2,350',
    change: '+15.3%',
    changeType: 'positive',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Active Users',
    value: '1,234',
    change: '+8.2%',
    changeType: 'positive',
    icon: UserGroupIcon,
  },
  {
    name: 'Meals Sold',
    value: '8,945',
    change: '+12.5%',
    changeType: 'positive',
    icon: ChartBarIcon,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
        >
          <dt>
            <div className="absolute rounded-md bg-blue-500 p-3">
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}



