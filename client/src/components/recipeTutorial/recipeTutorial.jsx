import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Typography,
  Chip,
} from "@material-tailwind/react";

import { BookOpen } from "lucide-react";
import { useState } from "react";
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

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
  };

  return (
    <div className="font-serif">
      <button
        onClick={handleOpen}
        className="inline-flex items-center bg-[#c98d83] text-white py-2 px-4 rounded-full hover:bg-[#b67c73] transition-colors duration-300 text-sm"
      >
        <BookOpen size={16} className="mr-2 font-serif" />
        View Instructions
      </button>
      <Dialog
        className="overflow-y-auto max-h-[90vh] w-[95vw] max-w-2xl mx-auto"
        handler={handleOpen}
        open={open}
      >
        <DialogHeader className="flex flex-col items-center p-3 font-serif">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-[#D5877E] mb-3">
            {recipe.dishName}
          </h1>
          <div className="w-full px-2 font-serif">
            <Stepper
              lineClassName="w-0.5"
              activeLineClassName="bg-[#D5877E]"
              activeStep={activeStep}
              isLastStep={(value) => setLastStep(value)}
              isFirstStep={(value) => setFirstStep(value)}
            >
              {stepsOverview.map((step, index) => (
                <Step
                  key={index}
                  className="w-3 h-3 cursor-pointer font-serif"
                  activeClassName="bg-[#D5877E]"
                  completedClassName="bg-[#D5877E]"
                  onClick={() => setActiveStep(index)}
                >
                  <div className="absolute -bottom-[1.5rem] w-max text-center">
                    <Typography
                      variant="small"
                      color={activeStep === index ? "blue-gray" : "gray"}
                      className="text-[10px] sm:text-xs"
                    >
                      {`Step ${index}`}
                    </Typography>
                  </div>
                </Step>
              ))}
            </Stepper>
          </div>
        </DialogHeader>
        <DialogBody className="flex flex-col items-center px-3 py-4">
          {stepsOverview[activeStep].stepMedia ? (
            <img
              src={stepsOverview[activeStep].stepMedia}
              className="object-cover w-full h-40 sm:h-48 md:h-56 shadow-md shadow-blue-gray-100 rounded-lg"
              alt=""
            />
          ) : (
            ""
          )}
          <div className="w-full mt-4 flex flex-col gap-3 font-serif">
            <h2 className="text-lg sm:text-xl md:text-2xl text-[#D5877E] font-semibold">
              {activeStep === 0 ? "Overview" : "Step Description"}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-blue-gray-600 leading-relaxed">
              {stepsOverview[activeStep].stepDescription}
            </p>
            {stepsOverview[activeStep].ingredients && (
              <div className="mt-2 font-serif">
                <h3 className="text-lg sm:text-xl font-semibold md:text-2xl text-[#D5877E] mb-2">
                  Ingredients
                </h3>
                <ul className="space-y-1 font-serif">
                  {stepsOverview[activeStep].ingredients.map(
                    (ingredient, index) => (
                      <li
                        className="text-xs sm:text-sm md:text-base text-blue-gray-600 "
                        key={index}
                      >
                        <Chip
                          className="w-fit font-serif"
                          style={{ backgroundColor: "#dbb2ab" }}
                          value={Object.values(ingredient).join("")}
                        />
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between px-3 py-2">
          <Button
            size="sm"
            className="bg-[#D5877E] text-xs sm:text-sm font-serif"
            onClick={handlePrev}
          >
            Previous
          </Button>
          <Button
            size="sm"
            className="bg-[#D5877E] text-xs sm:text-sm font-serif"
            onClick={handleNext}
          >
            Next
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
