import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import TextAdd from "../../components/textsComponents/textAddComponent";
import { useContext } from "react";
import { Context } from "../../components/contextProvider";
import StepsTextAdd from "../../components/textsComponents/stepsTextComponent";
import useRecipeHooks from "../../hooks/recipeHooks/recipeHooks";
const Recipe_dish_creation = () => {
  const [dishName, setDish] = useContext(Context).dishName;
  const [recipeOverview, setRecipe] = useContext(Context).recipeOverview;
  const [duration, setDuration] = useContext(Context).duration;
  const [overviewPicture, setOverviewPicture] = useContext(
    Context
  ).overviewPicture;
  const [category, setCategory] = useContext(Context).category;
  const [dishDescription, setDescription] = useContext(Context).dishDescription;
  const [dishPictures, setDishPictures] = useContext(Context).dishPictures;
  const [price, setPrice] = useContext(Context).price;
  
  const [includesDish, setIncludesDish] = useContext(Context).includesDish;

  const handleCreateRecipe = useRecipeHooks();

  return (
    <div className="min-h-screen bg-[#fbf6f4] font-serif py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-[#c98d83] mb-8">
          Create New Recipe & Dish
        </h1>

        <form onSubmit={handleCreateRecipe} className="space-y-6">
          {/* Recipe Inputs */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#c98d83]">
              Recipe Details
            </h2>

            <div>
              <label
                htmlFor="dishName"
                className="block text-sm font-medium text-gray-700"
              >
                Dish Name
              </label>
              <input
                type="text"
                id="dishName"
                name="dishName"
                value={dishName}
                onChange={(e) => {
                  setDish(e.target.value);
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#c98d83] focus:border-[#c98d83]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="recipeOverview"
                className="block text-sm font-medium text-gray-700"
              >
                Recipe Overview
              </label>
              <textarea
                id="recipeOverview"
                name="recipeOverview"
                value={recipeOverview}
                onChange={(e) => {
                  setRecipe(e.target.value);
                }}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#c98d83] focus:border-[#c98d83]"
                required
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium text-gray-700"
              >
                Ingredients
              </label>
              <TextAdd text="Ingrediants" />
            </div>

            <div>
              <StepsTextAdd text="Steps" />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration (in minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#c98d83] focus:border-[#c98d83]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="overviewPicture"
                className="block text-sm font-medium text-gray-700"
              >
                Overview Picture
              </label>
              <input
                type="file"
                id="overviewPicture"
                name="overviewPicture"
                onChange={(e) => setOverviewPicture(e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#c98d83] file:text-white
                hover:file:bg-[#b17c73]"
                accept="image/*"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                id="category"
                name="category"
                value={category}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#c98d83] focus:border-[#c98d83] sm:text-sm rounded-md"
                required
              >
                <option value="">Select a category</option>
                <option value="High-Calorie">High-Calorie</option>
                <option value="Moderate-Calorie">Moderate-Calorie</option>
                <option value="Low-Calorie">Low-Calorie</option>
                <option value="American Cuisine">American Cuisine</option>
                <option value="Middle Eastern Cuisine">
                  Middle Eastern Cuisine
                </option>
                <option value="Italian Cuisine">Italian Cuisine</option>
                <option value="French Cuisine">French Cuisine</option>
              </select>
            </div>
          </div>

          {/* Checkbox for including dish */}
          <div className="flex items-center">
            <input
              id="includesDish"
              name="includesDish"
              type="checkbox"
              checked={includesDish}
              onChange={(e) => setIncludesDish(e.target.checked)}
              className="h-4 w-4 text-[#c98d83] focus:ring-[#c98d83] border-gray-300 rounded"
            />
            <label
              htmlFor="includesDish"
              className="ml-2 block text-sm text-gray-900"
            >
              Include Dish Details
            </label>
          </div>

          {/* Dish Inputs */}
          {includesDish && (
            <div className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold text-[#c98d83]">
                Dish Details
              </h2>

              <div>
                <label
                  htmlFor="dishDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dish Description
                </label>
                <textarea
                  id="dishDescription"
                  name="dishDescription"
                  value={dishDescription}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#c98d83] focus:border-[#c98d83]"
                  required={includesDish}
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#c98d83] focus:border-[#c98d83]"
                  required={includesDish}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#c98d83] hover:bg-[#b17c73] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c98d83]"
            >
              <Plus className="mr-2" size={16} />
              Create Recipe {includesDish && "& Dish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recipe_dish_creation;
