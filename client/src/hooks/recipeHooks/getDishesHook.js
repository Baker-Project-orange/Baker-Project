import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
const useGetDishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const getDishes = async () => {
      try {
        const response = await axiosInstance.get("/api/dishes/getChefDishes");
        setDishes(response);
      } catch (e) {
        console.log(e);
      }
    };
    getDishes();
  }, []);
  return dishes;
};

export default useGetDishes;