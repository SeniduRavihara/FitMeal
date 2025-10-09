import { MealManagement } from "@/features/meals";

export default function MealsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Meal Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your meal inventory, pricing, and nutrition information
        </p>
      </div>
      <MealManagement />
    </div>
  );
}
