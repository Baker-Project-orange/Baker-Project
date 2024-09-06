import { useContext } from "react";
import { Context } from "../../components/contextProvider";
import axiosInstance from "../../utils/axios";
const useRecipeHooks = () => {
  const [dishName, setDish] = useContext(Context).dishName;
  const [recipeOverview, setRecipe] = useContext(Context).recipeOverview;
  const [duration, setDuration] = useContext(Context).duration;
  const [overviewPicture, setOverviewPicture] =
    useContext(Context).overviewPicture;
  const [category, setCategory] = useContext(Context).category;
  const [dishDescription, setDescription] = useContext(Context).dishDescription;
  const [dishPictures, setDishPictures] = useContext(Context).dishPictures;
  const [price, setPrice] = useContext(Context).price;
  const [ingrediants, setIngrediants] = useContext(Context).ingrediants;
  const [steps, setSteps] = useContext(Context).steps;
  const [includesDish, setIncludesDish] = useContext(Context).includesDish;

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/recipes/makeRecipie", {
        dishName: dishName,
        recipeOverview: recipeOverview,
        duration: duration,
        file: overviewPicture,
        isDish: includesDish,
        category: category,
        ingrediants: ingrediants,
        steps: steps,
      });

      if (includesDish) {
        const dishResponse = await axiosInstance.post(
          "/api/dishes/makeDishes",
          {
            recipieID: response.data.recipie._id,
            dishDescription: dishDescription,
            price: price,
            file: dishPictures,
            category: category,
            ingrediants: ingrediants,
            steps: steps,
          }
        );
        console.log(dishResponse.data);
      }

      // Reset all context values after successful creation
      setDish("");
      setRecipe("");
      setDuration("");
      setOverviewPicture(null);
      setCategory("");
      setDescription("");
      setDishPictures([]);
      setPrice("");
      setIngrediants([]);
      setSteps([]);
      setIncludesDish(false);

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return handleCreateRecipe;
};

export default useRecipeHooks;
