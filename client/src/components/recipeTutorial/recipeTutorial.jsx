import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";

import { BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Stepper, Step } from "@material-tailwind/react";
export const RecipeTutorial = ({ recipe }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFirstStep, setFirstStep] = useState(false);
  const [isLastStep, setLastStep] = useState(false);
  const [stepsOverview, setStep] = useState([
    {
      stepTitle: "Overview",
      stepDescription: recipe.recipeOverview,
      stepMedia: recipe.overviewPicture,
      ingredients: recipe.ingredients,
    },
    ...recipe.steps,
  ]);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
  };

  console.log(stepsOverview);
  return (
    <div>
      <button
        onClick={handleOpen}
        className="inline-flex items-center bg-[#c98d83] text-white py-2 px-4 rounded-full hover:bg-[#b67c73] transition-colors duration-300"
      >
        <BookOpen size={20} className="mr-2" />
        View Instructions
      </button>
      <Dialog className="overflow-y-scroll" handler={handleOpen} open={open}>
        <DialogHeader className="flex justify-center items-center flex-col">
          <div className="w-[80%] mb-5">
            <h1 className="text-[1.5rem] text-[#D5877E]">{recipe.dishName}</h1>
          </div>
          <div className="w-[70%] flex flex-col gap-5">
            <Stepper
              lineClassName=""
              activeLineClassName="bg-[#D5877E]"
              activeStep={activeStep}
              isLastStep={(value) => setLastStep(value)}
              isFirstStep={(value) => setFirstStep(value)}
            >
              {stepsOverview.map((step, index) => (
                <Step
                  className="w-4 h-4 cursor-pointer  "
                  activeClassName="bg-[#D5877E]"
                  completedClassName="bg-[#D5877E]"
                  onClick={() => setActiveStep(index)}
                >
                  <div className="absolute -bottom-16 w-max text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 0 ? "gray" : "blue-gray"}
                    >
                      {`Step ${index}`}
                    </Typography>
                    <Typography
                      variant="h6"
                      color={activeStep === 0 ? "gray" : "blue-gray"}
                    >
                      {step.stepTitle}
                    </Typography>
                  </div>
                </Step>
              ))}
            </Stepper>
          </div>
        </DialogHeader>
        <DialogBody className="flex items-center justify-center ">
          <div className="w-[80%] mt-12 flex flex-col gap-10">
            <img
              src={stepsOverview[activeStep].stepMedia}
              className="object-cover w-full h-[15rem] shadow-lg shadow-blue-gray-200 rounded-lg"
              alt=""
            />
            <div className="flex flex-col gap-5">
              <h1 className="text-[#D5877E] text-[1.3rem]">
                {activeStep == 0 ? "Overview" : "Step Description"}
              </h1>
              <p className="text-blue-gray-400">
                {stepsOverview[activeStep].stepDescription}
              </p>
              {stepsOverview[activeStep].ingredients !== undefined ? (
                <div>
                  <h1 className="text-[#D5877E] text-[1.3rem]">Ingredients</h1>
                  <ul className="flex flex-col gap-4">
                    {stepsOverview[activeStep].ingredients &&
                      stepsOverview[activeStep].ingredients.map(
                        (ingredient, index) => {
                          return (
                            <li className="text-blue-gray-400 " key={index}>
                              - {Object.values(ingredient).join("")}
                            </li>
                          );
                        }
                      )}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex justify-between w-[99%]">
            <Button className="bg-[#D5877E]" onClick={handlePrev}>
              Previous
            </Button>
            <Button className="bg-[#D5877E]" onClick={handleNext}>
              Next
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
