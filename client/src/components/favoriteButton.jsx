import React, { useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios"; // تأكد من تثبيت axios 

const FavoriteButton = ({ recipeId, initialIsFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const toggleFavorite = async () => {
    try {
      // جلب userId من localStorage
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User ID not found in local storage.");
        return;
      }

      // استدعاء API لتغيير حالة المفضلة
      const response = await axios.post("http://localhost:3000/api/users/add", {
        userId,
        recipeId,
      });

      if (response.status === 200) {
        setIsFavorite(!isFavorite); // تغيير الحالة في الواجهة
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("حدث خطأ أثناء تعديل المفضلة."); // عرض تنبيه في حالة حدوث خطأ
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors duration-300 ${
        isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
      }`}
    >
      <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
    </button>
  );
};

export default FavoriteButton;
