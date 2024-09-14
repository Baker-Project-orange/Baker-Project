import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../components/contextProvider";
import { Clock, DollarSign, Edit, Trash2, Save, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../utils/axios";

const Recipe_dish_management = () => {
  const [activeTab, setActiveTab] = useState("recipe");
  const [isEditing, setIsEditing] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [dish, setDish] = useState({});
  const [recipeID, setRecipeID] = useContext(Context).recipeID;
  const [active_tab, set_active_tab] = useContext(Context).active_tab;

  const deleteMessage = () =>
    toast("Recipe has been deleted successfully", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: "Bounce",
    });

  const handleUpdate = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving changes:", activeTab === "recipe" ? recipe : dish);
    // Add save logic here
  };
  const handleCancel = () => setIsEditing(false);

  const handleDelete = async () => {
    console.log("Deleting:", activeTab === "recipe" ? "recipe" : "dish");
  
    if (activeTab === "recipe") {
      try {
        // Send recipeID as a query parameter
        const response = await axiosInstance.patch(`/api/recipes/deleteRecipie`, null, {
          params: { recipeID }
        });
  
        if (response.status === 202) {
          deleteMessage();
          set_active_tab("catalog");
          sessionStorage.setItem("tab", "catalog");
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    } else {
      // Add dish deletion logic if needed
    }
  };
  

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeResponse = await axiosInstance.get(`/api/recipes/${recipeID}`);
        setRecipe(recipeResponse.data);
        if (recipeResponse.data.isDish) {
          const dishResponse = await axiosInstance.get(`/api/dishes/getDishByRecipeID?recipeID=${recipeID}`);
          setDish(dishResponse.data.dish);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [recipeID]);

  const inputClass = "mt-1 block w-full rounded-md border-2 border-[#c98d83] shadow-sm focus:border-[#c98d83] focus:ring focus:ring-[#c98d83] focus:ring-opacity-50 px-4 py-2";

  const renderEditableContent = () => {
    if (activeTab === "recipe") {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="dishName"
              value={recipe.dishName || ''}
              onChange={(e) => handleInputChange(e, setRecipe)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="recipeOverview"
              rows="3"
              value={recipe.recipeOverview || ''}
              onChange={(e) => handleInputChange(e, setRecipe)}
              className={inputClass}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={recipe.duration || ''}
              onChange={(e) => handleInputChange(e, setRecipe)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (one per line)</label>
            <textarea
              name="ingredients"
              rows="4"
              value={(recipe.ingredients || []).join("\n")}
              onChange={(e) => handleInputChange(
                { target: { name: "ingredients", value: e.target.value.split("\n") } },
                setRecipe
              )}
              className={inputClass}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Steps (one per line)</label>
            <textarea
              name="steps"
              rows="6"
              value={(recipe.steps || []).map(step => step.stepDescription).join("\n")}
              onChange={(e) => handleInputChange(
                { target: { name: "steps", value: e.target.value.split("\n").map(step => ({ stepDescription: step })) } },
                setRecipe
              )}
              className={inputClass}
            ></textarea>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={dish.name || ''}
              onChange={(e) => handleInputChange(e, setDish)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="dishDescription"
              rows="3"
              value={dish.dishDescription || ''}
              onChange={(e) => handleInputChange(e, setDish)}
              className={inputClass}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={dish.price || ''}
              onChange={(e) => handleInputChange(e, setDish)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Serving Size</label>
            <input
              type="text"
              name="servingSize"
              value={dish.servingSize || ''}
              onChange={(e) => handleInputChange(e, setDish)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contents (one per line)</label>
            <textarea
              name="contents"
              rows="4"
              value={(dish.contents || []).join("\n")}
              onChange={(e) => handleInputChange(
                { target: { name: "contents", value: e.target.value.split("\n") } },
                setDish
              )}
              className={inputClass}
            ></textarea>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf6f4] font-serif  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          <button
            className={`flex-1 py-3 px-4 text-center font-semibold ${
              activeTab === "recipe"
                ? "bg-[#c98d83] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("recipe")}
          >
            Recipe
          </button>
          {recipe.isDish && (
            <button
              className={`flex-1 py-3 px-4 text-center font-semibold ${
                activeTab === "dish"
                  ? "bg-[#c98d83] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("dish")}
            >
              Dish
            </button>
          )}
        </div>
        <div className="p-8">
          {isEditing ? (
            renderEditableContent()
          ) : (
            <div>
              {activeTab === "recipe" ? (
                <div>
                  <div className="mb-8">
                    <div className="flex mb-6">
                      <img
                        src={recipe.overviewPicture || "/default-image.png"}
                        alt={recipe.dishName || "Recipe Image"}
                        className="w-full h-[20rem] object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <h1 className="text-3xl font-bold text-[#c98d83] mb-3">
                      {recipe.dishName || "Recipe Name"}
                    </h1>
                    <p className="text-gray-600 mb-4">
                      {recipe.recipeOverview || "Recipe Overview"}
                    </p>
                    <div className="flex items-center mb-4 bg-[#f8e5e1] p-2 rounded-md">
                      <Clock className="text-[#c98d83] mr-2" />
                      <span className="font-medium">
                        {recipe.duration || "Duration"} minutes
                      </span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 text-[#c98d83]">
                    Ingredients
                  </h2>
                  <ul className="list-disc pl-5 mb-6 space-y-1">
                    {(recipe.ingredients || []).map((ingredient, index) => (
                      <li key={index}>{ingredient.name || "Ingredient"}</li>
                    ))}
                  </ul>
                  <h2 className="text-2xl font-semibold mb-3 text-[#c98d83]">
                    Steps
                  </h2>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    {(recipe.steps || []).map((step, index) => (
                      <li key={index}>
                        {step.stepDescription || "Step Description"}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div>
                  <div className="mb-8">
                    <div className=" mb-6">
                      <img
                        src={recipe.overviewPicture || "/default-image.png"}
                        alt={`${recipe.dishName} Dish Image`}
                        className="w-full h-[20rem] object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <h1 className="text-3xl font-bold text-[#c98d83] mb-3">
                      {recipe.dishName || "Dish Name"}
                    </h1>
                    <p className="text-gray-600 mb-4">
                      {dish.dishDescription || "Dish Description"}
                    </p>
                    <div className="flex items-center mb-4 bg-[#f8e5e1] p-2 rounded-md">
                      <DollarSign className="text-[#c98d83] mr-2" />
                      <span className="font-medium">
                        {dish.price || "Price"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end space-x-4 mt-8">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center px-6 py-2 bg-[#c98d83] text-white rounded-full hover:bg-[#b67c73] transition-colors"
                >
                  <Save className="mr-2" size={18} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                >
                  <X className="mr-2" size={18} />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  className="flex items-center px-6 py-2 bg-[#c98d83] text-white rounded-full hover:bg-[#b67c73] transition-colors"
                >
                  <Edit className="mr-2" size={18} />
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="mr-2" size={18} />
                  Delete
                </button>
                <ToastContainer transition={"Bounce"} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe_dish_management;
