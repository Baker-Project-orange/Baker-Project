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

        setRecipies(response.data.recipies);
      } catch (e) {
        console.log(e);
      }
    };
    getRecipies();
  }, []);

  return recipies;
};

export default useGetRecipes;
