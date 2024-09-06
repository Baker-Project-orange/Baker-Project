import React, { useState } from 'react';
import { Clock, DollarSign, Edit, Trash2, Save, X, Facebook, Twitter, Instagram, Linkedin, MessageCircle } from 'lucide-react';

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from "react-share";

const Recipe_dish_management = () => {
  const [activeTab, setActiveTab] = useState('recipe');
  const [isEditing, setIsEditing] = useState(false);
  const [recipe, setRecipe] = useState({
    id: 1,
    name: 'Artisanal Sourdough Bread',
    description: 'A rustic, tangy sourdough bread with a perfect crust',
    ingredients: [
      '500g bread flour',
      '350g water',
      '100g active sourdough starter',
      '10g salt'
    ],
    steps: [
      'Mix flour, water, and starter. Let rest for 30 minutes.',
      'Add salt and knead for 10 minutes.',
      'Let dough rise for 4-6 hours, folding every hour.',
      'Shape the dough and place in a proofing basket.',
      'Final proof for 2-3 hours or overnight in the refrigerator.',
      'Preheat oven to 450°F (230°C) with a Dutch oven inside.',
      'Score the dough and bake covered for 30 minutes.',
      'Remove lid and bake for another 15-20 minutes until golden brown.'
    ],
    duration: 720,
    pictures: ['https://i.pinimg.com/564x/fa/97/c5/fa97c505e3da92a3a26623c61d5df8ff.jpg', 'https://i.pinimg.com/564x/12/ea/87/12ea870341c9a9a7584856c3cde6b4cb.jpg']
  });

  const [dish, setDish] = useState({
    id: 1,
    name: 'Artisan Bread Basket',
    description: 'A delightful assortment of freshly baked artisan breads',
    price: 15.99,
    contents: [
      'Sourdough boule',
      'Rosemary focaccia',
      'Whole wheat baguette',
      'Olive ciabatta'
    ],
    servingSize: '4-6 people',
    pictures: ['https://i.pinimg.com/564x/f8/ed/ce/f8edcecdadcfd06cd6f44e06b25f0c32.jpg', 'https://i.pinimg.com/564x/58/fc/49/58fc49cbfa20b107d1ea08b486287b73.jpg']
  });

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving changes:', activeTab === 'recipe' ? recipe : dish);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  const handleDelete = () => {
    console.log('Deleting:', activeTab === 'recipe' ? 'recipe' : 'dish');
    // Implement delete logic here
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const inputClass = "mt-1 block w-full rounded-md border-2 border-[#c98d83] shadow-sm focus:border-[#c98d83] focus:ring focus:ring-[#c98d83] focus:ring-opacity-50 px-4 py-2";

  const renderEditableContent = () => {
    if (activeTab === 'recipe') {
      return (
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipe.name}
              onChange={(e) => handleInputChange(e, setRecipe)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={recipe.description}
              onChange={(e) => handleInputChange(e, setRecipe)}
              className={inputClass}
            ></textarea>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={recipe.duration}
              onChange={(e) => handleInputChange(e, setRecipe)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">Ingredients (one per line)</label>
            <textarea
              id="ingredients"
              name="ingredients"
              rows="4"
              value={recipe.ingredients.join('\n')}
              onChange={(e) => handleInputChange({ target: { name: 'ingredients', value: e.target.value.split('\n') } }, setRecipe)}
              className={inputClass}
            ></textarea>
          </div>
          <div>
            <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-1">Steps (one per line)</label>
            <textarea
              id="steps"
              name="steps"
              rows="6"
              value={recipe.steps.join('\n')}
              onChange={(e) => handleInputChange({ target: { name: 'steps', value: e.target.value.split('\n') } }, setRecipe)}
              className={inputClass}
            ></textarea>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={dish.name}
              onChange={(e) => handleInputChange(e, setDish)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={dish.description}
              onChange={(e) => handleInputChange(e, setDish)}
              className={inputClass}
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={dish.price}
              onChange={(e) => handleInputChange(e, setDish)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="servingSize" className="block text-sm font-medium text-gray-700 mb-1">Serving Size</label>
            <input
              type="text"
              id="servingSize"
              name="servingSize"
              value={dish.servingSize}
              onChange={(e) => handleInputChange(e, setDish)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contents" className="block text-sm font-medium text-gray-700 mb-1">Contents (one per line)</label>
            <textarea
              id="contents"
              name="contents"
              rows="4"
              value={dish.contents.join('\n')}
              onChange={(e) => handleInputChange({ target: { name: 'contents', value: e.target.value.split('\n') } }, setDish)}
              className={inputClass}
            ></textarea>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8e5e1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          <button
            className={`flex-1 py-3 px-4 text-center font-semibold ${activeTab === 'recipe' ? 'bg-[#c98d83] text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('recipe')}
          >
            Recipe
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-semibold ${activeTab === 'dish' ? 'bg-[#c98d83] text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('dish')}
          >
            Dish
          </button>
        </div>

        <div className="p-8">
          {isEditing ? (
            renderEditableContent()
          ) : (
            <div>
              {activeTab === 'recipe' ? (
                <div>
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {recipe.pictures.map((pic, index) => (
                        <img key={index} src={pic} alt={`${recipe.name} ${index + 1}`} className="w-full h-48 object-cover rounded-lg shadow-md" />
                      ))}
                    </div>
                    <h1 className="text-3xl font-bold text-[#c98d83] mb-3">{recipe.name}</h1>
                    <p className="text-gray-600 mb-4">{recipe.description}</p>
                    <div className="flex items-center mb-4 bg-[#f8e5e1] p-2 rounded-md">
                      <Clock className="text-[#c98d83] mr-2" />
                      <span className="font-medium">{recipe.duration} minutes</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold mb-3 text-[#c98d83]">Ingredients</h2>
                  <ul className="list-disc pl-5 mb-6 space-y-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>

                  <h2 className="text-2xl font-semibold mb-3 text-[#c98d83]">Steps</h2>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    {recipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div>
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {dish.pictures.map((pic, index) => (
                        <img key={index} src={pic} alt={`${dish.name} ${index + 1}`} className="w-full h-48 object-cover rounded-lg shadow-md" />
                      ))}
                    </div>
                    <h1 className="text-3xl font-bold text-[#c98d83] mb-3">{dish.name}</h1>
                    <p className="text-gray-600 mb-4">{dish.description}</p>
                    <div className="flex items-center mb-4 bg-[#f8e5e1] p-2 rounded-md">
                      <DollarSign className="text-[#c98d83] mr-2" />
                      <span className="font-medium">${dish.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold mb-3 text-[#c98d83]">Contents</h2>
                  <ul className="list-disc pl-5 mb-6 space-y-1">
                    {dish.contents.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <p className="mb-6 bg-[#f8e5e1] p-2 rounded-md">
                    <strong>Serving Size:</strong> {dish.servingSize}
                  </p>
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
              </>
            )}
          </div>
        </div>
        <div className='social_media bg-[#c98d83] p-4'>
          <div className="flex justify-center items-center space-x-6">
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <FacebookShareButton url=''>
                <Facebook size={24} />
              </FacebookShareButton>
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <MessageCircle size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe_dish_management;