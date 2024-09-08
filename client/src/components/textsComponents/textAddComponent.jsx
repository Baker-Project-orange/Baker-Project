import { Input, Button, Chip } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../contextProvider";

const TextAdd = (props) => {
  const [ingrediants, setIngrediants] = useContext(Context).ingrediants;
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(ingrediants);
  }, [ingrediants]);

  const handleAddText = () => {
    setIngrediants([...ingrediants, text]);
    setText(""); // Clear the input after adding
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-10">
        <Input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#c98d83] focus:border-[#c98d83]"
        />
        <Button onClick={handleAddText} variant="outlined">
          Add
        </Button>
      </div>
      <div className="flex flex-col gap-5 w-full">
        {ingrediants.map((ingrediant, index) => (
          <Chip className="w-fit" key={index} value={ingrediant} color="pink" />
        ))}
      </div>
    </div>
  );
};

export default TextAdd;
