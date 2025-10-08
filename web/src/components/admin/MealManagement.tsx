"use client";

import {
  BeakerIcon,
  ChartBarIcon,
  CogIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

// Meal Base Template Interface
interface MealBase {
  id: string;
  name: string;
  basePrice: number;
  image: string;
  description: string;
  ingredients: string[];
  availableCustomizations: {
    protein: { min: number; max: number; default: number };
    carbs: { min: number; max: number; default: number };
    fats: { min: number; max: number; default: number };
  };
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// Sample meal bases data
const sampleMealBases: MealBase[] = [
  {
    id: "1",
    name: "Chicken & Rice Bowl",
    basePrice: 12.99,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop",
    description: "Grilled chicken with jasmine rice and vegetables",
    ingredients: [
      "Chicken breast",
      "Jasmine rice",
      "Mixed vegetables",
      "Olive oil",
      "Herbs",
    ],
    availableCustomizations: {
      protein: { min: 20, max: 80, default: 40 },
      carbs: { min: 15, max: 60, default: 35 },
      fats: { min: 10, max: 40, default: 20 },
    },
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Salmon & Quinoa",
    basePrice: 16.99,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=100&h=100&fit=crop",
    description: "Atlantic salmon with quinoa and roasted vegetables",
    ingredients: [
      "Salmon fillet",
      "Quinoa",
      "Broccoli",
      "Sweet potato",
      "Lemon",
    ],
    availableCustomizations: {
      protein: { min: 25, max: 70, default: 45 },
      carbs: { min: 20, max: 55, default: 30 },
      fats: { min: 15, max: 35, default: 25 },
    },
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "3",
    name: "Vegan Buddha Bowl",
    basePrice: 11.99,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
    description: "Plant-based bowl with chickpeas, quinoa, and vegetables",
    ingredients: ["Chickpeas", "Quinoa", "Kale", "Avocado", "Tahini"],
    availableCustomizations: {
      protein: { min: 15, max: 50, default: 25 },
      carbs: { min: 25, max: 70, default: 45 },
      fats: { min: 10, max: 30, default: 18 },
    },
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

export default function MealManagement() {
  const [mealBases, setMealBases] = useState<MealBase[]>(sampleMealBases);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealBase | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for adding new meal base
  const [newMealForm, setNewMealForm] = useState({
    name: "",
    basePrice: 0,
    image: "",
    description: "",
    ingredients: [""],
    proteinMin: 20,
    proteinMax: 80,
    proteinDefault: 40,
    carbsMin: 15,
    carbsMax: 60,
    carbsDefault: 35,
    fatsMin: 10,
    fatsMax: 40,
    fatsDefault: 20,
    status: "active" as "active" | "inactive",
  });

  // Nutrition Calculator Component
  const NutritionCalculator = ({ mealBase }: { mealBase: MealBase }) => {
    const [protein, setProtein] = useState(
      mealBase.availableCustomizations.protein.default
    );
    const [carbs, setCarbs] = useState(
      mealBase.availableCustomizations.carbs.default
    );
    const [fats, setFats] = useState(
      mealBase.availableCustomizations.fats.default
    );

    const calculateCalories = () => {
      return protein * 4 + carbs * 4 + fats * 9;
    };

    const calculatePrice = () => {
      const basePrice = mealBase.basePrice;
      const totalMacros = protein + carbs + fats;
      const customizationFee =
        totalMacros > 100 ? 2.5 : totalMacros > 80 ? 1.5 : 0;
      return basePrice + customizationFee;
    };

    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Nutrition Calculator
        </h4>

        {/* Protein Slider */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Protein: {protein}g
          </label>
          <input
            type="range"
            min={mealBase.availableCustomizations.protein.min}
            max={mealBase.availableCustomizations.protein.max}
            value={protein}
            onChange={(e) => setProtein(Number(e.target.value))}
            className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${((protein - mealBase.availableCustomizations.protein.min) / (mealBase.availableCustomizations.protein.max - mealBase.availableCustomizations.protein.min)) * 100}%, #e5e7eb ${((protein - mealBase.availableCustomizations.protein.min) / (mealBase.availableCustomizations.protein.max - mealBase.availableCustomizations.protein.min)) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{mealBase.availableCustomizations.protein.min}g</span>
            <span>{mealBase.availableCustomizations.protein.max}g</span>
          </div>
        </div>

        {/* Carbs Slider */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Carbs: {carbs}g
          </label>
          <input
            type="range"
            min={mealBase.availableCustomizations.carbs.min}
            max={mealBase.availableCustomizations.carbs.max}
            value={carbs}
            onChange={(e) => setCarbs(Number(e.target.value))}
            className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${((carbs - mealBase.availableCustomizations.carbs.min) / (mealBase.availableCustomizations.carbs.max - mealBase.availableCustomizations.carbs.min)) * 100}%, #e5e7eb ${((carbs - mealBase.availableCustomizations.carbs.min) / (mealBase.availableCustomizations.carbs.max - mealBase.availableCustomizations.carbs.min)) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{mealBase.availableCustomizations.carbs.min}g</span>
            <span>{mealBase.availableCustomizations.carbs.max}g</span>
          </div>
        </div>

        {/* Fats Slider */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Fats: {fats}g
          </label>
          <input
            type="range"
            min={mealBase.availableCustomizations.fats.min}
            max={mealBase.availableCustomizations.fats.max}
            value={fats}
            onChange={(e) => setFats(Number(e.target.value))}
            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #22c55e 0%, #22c55e ${((fats - mealBase.availableCustomizations.fats.min) / (mealBase.availableCustomizations.fats.max - mealBase.availableCustomizations.fats.min)) * 100}%, #e5e7eb ${((fats - mealBase.availableCustomizations.fats.min) / (mealBase.availableCustomizations.fats.max - mealBase.availableCustomizations.fats.min)) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{mealBase.availableCustomizations.fats.min}g</span>
            <span>{mealBase.availableCustomizations.fats.max}g</span>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white p-3 rounded border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Total Calories:</span>
            <span className="text-sm font-bold text-blue-600">
              {calculateCalories()} cal
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Base Price:</span>
            <span className="text-sm">LKR {mealBase.basePrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Price:</span>
            <span className="text-sm font-bold text-green-600">
              LKR {calculatePrice().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const handleSelectAll = () => {
    if (selectedMeals.length === mealBases.length) {
      setSelectedMeals([]);
    } else {
      setSelectedMeals(mealBases.map((meal) => meal.id));
    }
  };

  const handleSelectMeal = (mealId: string) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  const filteredMeals = mealBases.filter((meal) => {
    const matchesSearch =
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || meal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Form handling functions
  const handleInputChange = (field: string, value: any) => {
    setNewMealForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...newMealForm.ingredients];
    newIngredients[index] = value;
    setNewMealForm((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const addIngredient = () => {
    setNewMealForm((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index: number) => {
    const newIngredients = newMealForm.ingredients.filter(
      (_, i) => i !== index
    );
    setNewMealForm((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const handleSubmitNewMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create new meal base object
      const newMealBase: MealBase = {
        id: Date.now().toString(), // Simple ID generation
        name: newMealForm.name,
        basePrice: newMealForm.basePrice,
        image: newMealForm.image,
        description: newMealForm.description,
        ingredients: newMealForm.ingredients.filter((ing) => ing.trim() !== ""),
        availableCustomizations: {
          protein: {
            min: newMealForm.proteinMin,
            max: newMealForm.proteinMax,
            default: newMealForm.proteinDefault,
          },
          carbs: {
            min: newMealForm.carbsMin,
            max: newMealForm.carbsMax,
            default: newMealForm.carbsDefault,
          },
          fats: {
            min: newMealForm.fatsMin,
            max: newMealForm.fatsMax,
            default: newMealForm.fatsDefault,
          },
        },
        status: newMealForm.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to meal bases list
      setMealBases((prev) => [newMealBase, ...prev]);

      // Reset form
      setNewMealForm({
        name: "",
        basePrice: 0,
        image: "",
        description: "",
        ingredients: [""],
        proteinMin: 20,
        proteinMax: 80,
        proteinDefault: 40,
        carbsMin: 15,
        carbsMax: 60,
        carbsDefault: 35,
        fatsMin: 10,
        fatsMax: 40,
        fatsDefault: 20,
        status: "active",
      });

      // Close modal
      setShowAddModal(false);

      // TODO: Here you would typically save to database
      console.log("New meal base created:", newMealBase);
    } catch (error) {
      console.error("Error creating meal base:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewMealForm({
      name: "",
      basePrice: 0,
      image: "",
      description: "",
      ingredients: [""],
      proteinMin: 20,
      proteinMax: 80,
      proteinDefault: 40,
      carbsMin: 15,
      carbsMax: 60,
      carbsDefault: 35,
      fatsMin: 10,
      fatsMax: 40,
      fatsDefault: 20,
      status: "active",
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <style jsx>{`
        /* Input field styling with proper padding and text visibility */
        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="number"],
        input[type="url"],
        textarea,
        select {
          padding: 12px 16px !important;
          box-sizing: border-box !important;
          color: #1f2937 !important;
          background-color: #ffffff !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="password"]:focus,
        input[type="number"]:focus,
        input[type="url"]:focus,
        textarea:focus,
        select:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }

        input[type="text"]::placeholder,
        input[type="email"]::placeholder,
        input[type="password"]::placeholder,
        input[type="number"]::placeholder,
        input[type="url"]::placeholder,
        textarea::placeholder {
          color: #9ca3af !important;
        }

        /* Label styling for better visibility */
        label {
          color: #374151 !important;
          font-weight: 500 !important;
        }

        /* Slider styling */
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #d1d5db;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-webkit-slider-thumb:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #d1d5db;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
        }
      `}</style>
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Meal Base Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage meal bases for the custom meal builder
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <BeakerIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <CogIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Meal Base
          </button>
          {selectedMeals.length > 0 && (
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete Selected ({selectedMeals.length})
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search meal bases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
            style={{
              padding: "12px 16px",
              color: "#1f2937",
              backgroundColor: "#ffffff",
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
            style={{
              padding: "12px 16px",
              color: "#1f2937",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Meal Bases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={meal.image}
                alt={meal.name}
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    meal.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {meal.status}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {meal.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{meal.description}</p>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Base Price:
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    LKR {meal.basePrice}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  Customization Range:
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-red-600">Protein:</span>
                    <span>
                      {meal.availableCustomizations.protein.min}-
                      {meal.availableCustomizations.protein.max}g
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-teal-600">Carbs:</span>
                    <span>
                      {meal.availableCustomizations.carbs.min}-
                      {meal.availableCustomizations.carbs.max}g
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-green-600">Fats:</span>
                    <span>
                      {meal.availableCustomizations.fats.min}-
                      {meal.availableCustomizations.fats.max}g
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedMeal(meal);
                      setShowPreviewModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                    title="Preview"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMeal(meal);
                      setShowEditModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                <input
                  type="checkbox"
                  checked={selectedMeals.includes(meal.id)}
                  onChange={() => handleSelectMeal(meal.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {showPreviewModal && selectedMeal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Meal Base Preview: {selectedMeal.name}
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <img
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  src={selectedMeal.image}
                  alt={selectedMeal.name}
                />
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Description</h4>
                    <p className="text-sm text-gray-600">
                      {selectedMeal.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Ingredients</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {selectedMeal.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <NutritionCalculator mealBase={selectedMeal} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Meal Base Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Add New Meal Base
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitNewMeal} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newMealForm.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full"
                      style={{
                        padding: "12px 16px",
                        color: "#1f2937",
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                      }}
                      placeholder="e.g., Chicken & Rice Bowl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base Price (LKR) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={newMealForm.basePrice}
                      onChange={(e) =>
                        handleInputChange(
                          "basePrice",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full"
                      style={{
                        padding: "12px 16px",
                        color: "#1f2937",
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                      }}
                      placeholder="12.99"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={newMealForm.image}
                      onChange={(e) =>
                        handleInputChange("image", e.target.value)
                      }
                      className="w-full"
                      style={{
                        padding: "12px 16px",
                        color: "#1f2937",
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                      }}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newMealForm.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className="w-full"
                      style={{
                        padding: "12px 16px",
                        color: "#1f2937",
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                      }}
                      placeholder="Brief description of the meal..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={newMealForm.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="w-full"
                      style={{
                        padding: "12px 16px",
                        color: "#1f2937",
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Right Column - Nutrition Settings */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Nutrition Customization Ranges
                  </h4>

                  {/* Protein Settings */}
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-red-800 mb-3">
                      Protein Settings
                    </h5>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Min (g)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newMealForm.proteinMin}
                          onChange={(e) =>
                            handleInputChange(
                              "proteinMin",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full"
                          style={{
                            padding: "8px 12px",
                            color: "#1f2937",
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Max (g)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newMealForm.proteinMax}
                          onChange={(e) =>
                            handleInputChange(
                              "proteinMax",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full"
                          style={{
                            padding: "8px 12px",
                            color: "#1f2937",
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Default (g)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newMealForm.proteinDefault}
                          onChange={(e) =>
                            handleInputChange(
                              "proteinDefault",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full"
                          style={{
                            padding: "8px 12px",
                            color: "#1f2937",
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Carbs Settings */}
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-teal-800 mb-3">
                      Carbs Settings
                    </h5>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Min (g)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newMealForm.carbsMin}
                          onChange={(e) =>
                            handleInputChange(
                              "carbsMin",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full"
                          style={{
                            padding: "8px 12px",
                            color: "#1f2937",
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Max (g)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newMealForm.carbsMax}
                          onChange={(e) =>
                            handleInputChange(
                              "carbsMax",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full"
                          style={{
                            padding: "8px 12px",
                            color: "#1f2937",
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Default (g)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newMealForm.carbsDefault}
                          onChange={(e) =>
                            handleInputChange(
                              "carbsDefault",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full"
                          style={{
                            padding: "8px 12px",
                            color: "#1f2937",
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fats Settings */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-green-800 mb-3">
                      Fats Settings
                    </h5>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Min (g)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newMealForm.fatsMin}
                          onChange={(e) =>
                            handleInputChange(
                              "fatsMin",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full"
                          style={{
                            padding: "8px 12px",
                            color: "#1f2937",
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Max (g)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newMealForm.fatsMax}
                          onChange={(e) =>
                            handleInputChange(
                              "fatsMax",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full"
                          style={{
                            padding: "8px 12px",
                            color: "#1f2937",
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Default (g)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newMealForm.fatsDefault}
                          onChange={(e) =>
                            handleInputChange(
                              "fatsDefault",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full"
                          style={{
                            padding: "8px 12px",
                            color: "#1f2937",
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Ingredients
                  </label>
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Ingredient
                  </button>
                </div>
                <div className="space-y-2">
                  {newMealForm.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) =>
                          handleIngredientChange(index, e.target.value)
                        }
                        className="flex-1"
                        style={{
                          padding: "12px 16px",
                          color: "#1f2937",
                          backgroundColor: "#ffffff",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                        }}
                        placeholder="Enter ingredient name"
                      />
                      {newMealForm.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating..." : "Create Meal Base"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredMeals.length === 0 && (
        <div className="text-center py-12">
          <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No meal bases found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm
              ? "Try adjusting your search criteria."
              : "Get started by creating a new meal base."}
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Meal Base
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
