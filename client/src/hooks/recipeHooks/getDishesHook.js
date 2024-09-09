import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
const useGetDishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {

    // console.log("inside get dish hook");
    const getDishes = async () => {
      try {
        const response = await axiosInstance.get("/api/dishes/getChefDishes");
        setDishes(response.data.dishes);

      } catch (e) {
        console.log(e);
      }
    };
    getDishes();
  }, []);
  return dishes;
};

export default useGetDishes;