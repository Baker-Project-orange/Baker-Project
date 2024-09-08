import { Input, Button, Chip } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import { Context } from "../contextProvider";

const StepsTextAdd = () => {
  const [steps, setSteps] = useContext(Context).steps;
  const [text, setText] = useState("");
  const [picture, setPicture] = useState(null);
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (picture) {
      console.log("Picture state updated:", picture);
    }
    if (steps) {
      console.log(steps[steps.length - 1]);
    }
  }, [picture, steps]);

  const handleAddText = () => {
    const step = {
      stepTitle: title,
      stepDescription: text,
      stepMedia: picture,
      note: note || "",
    };
    setSteps([...steps, step]);
    setText("");
    setPicture(null);
    setNote("");
    setTitle("");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-10">
        <label className="block text-sm font-medium text-gray-700">
          Step Title
        </label>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#c98d83] focus:border-[#c98d83]"
        />
        <label className="block text-sm font-medium text-gray-700">Step</label>
        <Input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#c98d83] focus:border-[#c98d83]"
        />

        <label className="block text-sm font-medium text-gray-700">
          Step Note
        </label>
        <Input
          onChange={(e) => setNote(e.target.value)}
          value={note}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#c98d83] focus:border-[#c98d83]"
        />

        <label className="block text-sm font-medium text-gray-700">
          Step Picture
        </label>
        <input
          type="file"
          onChange={(e) => {
            setPicture(e.target.files[0]);

            console.log(picture);
          }}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#c98d83] file:text-white hover:file:bg-[#b17c73]"
          accept="image/*"
        />

        <Button onClick={handleAddText} variant="outlined">
          Add
        </Button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {steps.map((step, index) => (
          <Chip
            className="w-fit"
            key={`${index}-${step.stepTitle}`}
            value={`Step ${index + 1}: ${step.stepTitle}`}
            color="pink"
          />
        ))}
      </div>
    </div>
  );
};

export default StepsTextAdd;
