import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
const useGetRecipes = () => {
  const [recipies, setRecipies] = useState([]);

  useEffect(() => {
    const getRecipies = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/recipes/getChefRecipies"
        );
        // console.log(response);
        setRecipies(response.data.recipies);
      } catch (e) {
        console.log(e);
      }
    };
    getRecipies();
  }, []);
  // console.log(recipies);
  return recipies;
};

export default useGetRecipes;
