import { StarIcon } from '@heroicons/react/24/solid';

const popularMeals = [
  {
    id: 1,
    name: 'Grilled Chicken & Quinoa Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop',
    orders: 245,
    rating: 4.8,
    revenue: 3675,
  },
  {
    id: 2,
    name: 'Mediterranean Salmon',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=100&h=100&fit=crop',
    orders: 189,
    rating: 4.9,
    revenue: 3591,
  },
  {
    id: 3,
    name: 'Vegan Buddha Bowl',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop',
    orders: 156,
    rating: 4.7,
    revenue: 2028,
  },
  {
    id: 4,
    name: 'Keto Beef Stir-Fry',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=100&h=100&fit=crop',
    orders: 134,
    rating: 4.6,
    revenue: 2278,
  },
];

export default function PopularMeals() {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Meals</h3>
      <div className="space-y-4">
        {popularMeals.map((meal) => (
          <div key={meal.id} className="flex items-center space-x-4">
            <img
              className="h-12 w-12 rounded-lg object-cover"
              src={meal.image}
              alt={meal.name}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {meal.name}
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-500">{meal.rating}</span>
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{meal.orders} orders</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">${meal.revenue}</p>
              <p className="text-xs text-gray-500">revenue</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


