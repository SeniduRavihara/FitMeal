"use client";

import { ImageUpload } from "@/shared";
import {
  CreateMealData,
  Meal,
  MealService,
  UpdateMealData,
} from "@/supabase/services/MealService";
import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function MealManagement() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  // Form state for new meal
  const [newMealForm, setNewMealForm] = useState<CreateMealData>({
    name: "",
    description: "",
    base_price: 0,
    image_url: "",
    category: "",
    is_available: true,
    protein_per_100g: 0,
    carbs_per_100g: 0,
    fats_per_100g: 0,
    calories_per_100g: 0,
    protein_min: 20,
    protein_max: 80,
    protein_default: 40,
    carbs_min: 30,
    carbs_max: 100,
    carbs_default: 50,
    fats_min: 10,
    fats_max: 50,
    fats_default: 25,
    ingredients: [],
    status: "active",
  });

  // Load meals and categories
  useEffect(() => {
    fetchMeals();
    fetchCategories();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const data = await MealService.getMeals({
        search: searchTerm || undefined,
        category: selectedCategory || undefined,
      });
      setMeals(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await MealService.getMealCategories();
      setCategories(data);
    } catch (err: any) {
      console.error("Error fetching categories:", err);
    }
  };

  // Re-fetch when search or category changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMeals();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory]);

  const handleInputChange = (field: keyof CreateMealData, value: any) => {
    setNewMealForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitNewMeal = async () => {
    try {
      if (!newMealForm.name || !newMealForm.base_price) {
        alert("Please fill in required fields");
        return;
      }

      await MealService.createMeal(newMealForm);
      setShowAddModal(false);
      resetForm();
      fetchMeals();
      fetchCategories(); // Refresh categories in case new one was added
    } catch (err: any) {
      alert(`Error creating meal: ${err.message}`);
    }
  };

  const handleUpdateMeal = async () => {
    if (!editingMeal) return;

    try {
      const updateData: UpdateMealData = {
        name: newMealForm.name,
        description: newMealForm.description,
        base_price: newMealForm.base_price,
        image_url: newMealForm.image_url,
        category: newMealForm.category,
        is_available: newMealForm.is_available,
        protein_per_100g: newMealForm.protein_per_100g,
        carbs_per_100g: newMealForm.carbs_per_100g,
        fats_per_100g: newMealForm.fats_per_100g,
        calories_per_100g: newMealForm.calories_per_100g,
        protein_min: newMealForm.protein_min,
        protein_max: newMealForm.protein_max,
        protein_default: newMealForm.protein_default,
        carbs_min: newMealForm.carbs_min,
        carbs_max: newMealForm.carbs_max,
        carbs_default: newMealForm.carbs_default,
        fats_min: newMealForm.fats_min,
        fats_max: newMealForm.fats_max,
        fats_default: newMealForm.fats_default,
        ingredients: newMealForm.ingredients,
        status: newMealForm.status,
      };

      await MealService.updateMeal(editingMeal.id, updateData);
      setEditingMeal(null);
      resetForm();
      fetchMeals();
      fetchCategories();
    } catch (err: any) {
      alert(`Error updating meal: ${err.message}`);
    }
  };

  const handleDeleteMeal = async (mealId: string) => {
    if (!confirm("Are you sure you want to delete this meal?")) return;

    try {
      await MealService.deleteMeal(mealId);
      fetchMeals();
    } catch (err: any) {
      alert(`Error deleting meal: ${err.message}`);
    }
  };

  const resetForm = () => {
    setNewMealForm({
      name: "",
      description: "",
      base_price: 0,
      image_url: "",
      category: "",
      is_available: true,
      protein_per_100g: 0,
      carbs_per_100g: 0,
      fats_per_100g: 0,
      calories_per_100g: 0,
      protein_min: 20,
      protein_max: 80,
      protein_default: 40,
      carbs_min: 30,
      carbs_max: 100,
      carbs_default: 50,
      fats_min: 10,
      fats_max: 50,
      fats_default: 25,
      ingredients: [],
      status: "active",
    });
  };

  const openEditModal = (meal: Meal) => {
    setEditingMeal(meal);
    setNewMealForm({
      name: meal.name,
      description: meal.description || "",
      base_price: meal.base_price,
      image_url: meal.image_url || "",
      category: meal.category || "",
      is_available: meal.is_available,
      protein_per_100g: meal.protein_per_100g,
      carbs_per_100g: meal.carbs_per_100g,
      fats_per_100g: meal.fats_per_100g,
      calories_per_100g: meal.calories_per_100g,
      protein_min: meal.protein_min,
      protein_max: meal.protein_max,
      protein_default: meal.protein_default,
      carbs_min: meal.carbs_min,
      carbs_max: meal.carbs_max,
      carbs_default: meal.carbs_default,
      fats_min: meal.fats_min,
      fats_max: meal.fats_max,
      fats_default: meal.fats_default,
      ingredients: meal.ingredients,
      status: meal.status,
    });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingMeal(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Meal Management</h2>
          <p className="text-gray-600">Manage your custom meal builder</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add New Meal
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search meals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            {/* Meal Image */}
            <div className="h-48 bg-gray-200 relative">
              {meal.image_url ? (
                <img
                  src={meal.image_url}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <EyeIcon className="h-12 w-12" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    meal.is_available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {meal.is_available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

            {/* Meal Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{meal.name}</h3>
                <span className="text-lg font-bold text-blue-600">
                  ${meal.base_price.toFixed(2)}
                </span>
              </div>

              {meal.category && (
                <p className="text-sm text-gray-500 mb-2">{meal.category}</p>
              )}

              {meal.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {meal.description}
                </p>
              )}

              {/* Nutrition Info */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="font-medium text-blue-800">Protein</div>
                  <div className="text-blue-600">
                    {meal.protein_per_100g}g/100g
                  </div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="font-medium text-green-800">Carbs</div>
                  <div className="text-green-600">
                    {meal.carbs_per_100g}g/100g
                  </div>
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  <div className="font-medium text-orange-800">Fats</div>
                  <div className="text-orange-600">
                    {meal.fats_per_100g}g/100g
                  </div>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <div className="font-medium text-purple-800">Calories</div>
                  <div className="text-purple-600">
                    {meal.calories_per_100g}/100g
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(meal)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-1"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMeal(meal.id)}
                  className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {meals.length === 0 && !loading && (
        <div className="text-center py-12">
          <EyeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No meals found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedCategory
              ? "Try adjusting your search or filters"
              : "Get started by adding your first meal"}
          </p>
          {!searchTerm && !selectedCategory && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Your First Meal
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Meal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingMeal ? "Edit Meal" : "Add New Meal"}
                </h3>
                <button
                  onClick={closeModal}
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
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  {/* Meal Name */}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Chicken & Rice Bowl"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newMealForm.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe the meal..."
                    />
                  </div>

                  {/* Price and Category */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Base Price *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={newMealForm.base_price}
                        onChange={(e) =>
                          handleInputChange(
                            "base_price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={newMealForm.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Protein, Healthy"
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <ImageUpload
                      onImageUploaded={(url) =>
                        handleInputChange("image_url", url)
                      }
                      initialImage={newMealForm.image_url}
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newMealForm.is_available}
                        onChange={(e) =>
                          handleInputChange("is_available", e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Available for order
                      </span>
                    </label>
                  </div>
                </div>

                {/* Right Column - Nutrition Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Nutrition Information (per 100g)
                  </h4>

                  {/* Nutrition Values */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Protein (g)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={newMealForm.protein_per_100g}
                        onChange={(e) =>
                          handleInputChange(
                            "protein_per_100g",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Carbs (g)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={newMealForm.carbs_per_100g}
                        onChange={(e) =>
                          handleInputChange(
                            "carbs_per_100g",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fats (g)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={newMealForm.fats_per_100g}
                        onChange={(e) =>
                          handleInputChange(
                            "fats_per_100g",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Calories
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={newMealForm.calories_per_100g}
                        onChange={(e) =>
                          handleInputChange(
                            "calories_per_100g",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Customization Ranges */}
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Customization Ranges
                  </h4>

                  {/* Protein Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Protein Range (g)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={newMealForm.protein_min}
                        onChange={(e) =>
                          handleInputChange(
                            "protein_min",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={newMealForm.protein_max}
                        onChange={(e) =>
                          handleInputChange(
                            "protein_max",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Default"
                        value={newMealForm.protein_default}
                        onChange={(e) =>
                          handleInputChange(
                            "protein_default",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Carbs Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carbs Range (g)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={newMealForm.carbs_min}
                        onChange={(e) =>
                          handleInputChange(
                            "carbs_min",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={newMealForm.carbs_max}
                        onChange={(e) =>
                          handleInputChange(
                            "carbs_max",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Default"
                        value={newMealForm.carbs_default}
                        onChange={(e) =>
                          handleInputChange(
                            "carbs_default",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Fats Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fats Range (g)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={newMealForm.fats_min}
                        onChange={(e) =>
                          handleInputChange(
                            "fats_min",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={newMealForm.fats_max}
                        onChange={(e) =>
                          handleInputChange(
                            "fats_max",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Default"
                        value={newMealForm.fats_default}
                        onChange={(e) =>
                          handleInputChange(
                            "fats_default",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={editingMeal ? handleUpdateMeal : handleSubmitNewMeal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingMeal ? "Update Meal" : "Create Meal"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
