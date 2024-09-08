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
  const [active_tab, set_active_tab] = useContext(Context).active_tab;

  const handleCreateRecipe = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dishName", dishName);
    formData.append("recipeOverview", recipeOverview);
    formData.append("duration", duration);
    formData.append("isDish", includesDish);
    formData.append("category", category);
    formData.append("ingredients", JSON.stringify(ingrediants));
    formData.append("steps", JSON.stringify(steps));

    steps.forEach((step, index) => {
      if (step.stepMedia) {
        formData.append("files", step.stepMedia);
      }
    });
    formData.append("files", overviewPicture);
    console.log(formData.getAll("category"));
    try {
      const response = await axiosInstance.post(
        "/api/recipes/makeRecipie",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (includesDish) {
        const dishFormData = new FormData();
        dishFormData.append("recipieID", response.data.recipie._id);
        dishFormData.append("dishDescription", dishDescription);
        dishFormData.append("price", price);

        const dishResponse = await axiosInstance.post(
          "/api/dishes/makeDishes",
          dishFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
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
      set_active_tab("home");
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return handleCreateRecipe;
};

export default useRecipeHooks;
