import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useState } from "react";
export const RecipeTutorial = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="inline-flex items-center bg-[#c98d83] text-white py-2 px-4 rounded-full hover:bg-[#b67c73] transition-colors duration-300"
      >
        <BookOpen size={20} className="mr-2" />
        View Instructions
      </button>
      <Dialog handler={handleOpen} open={open}>
        <DialogHeader></DialogHeader>
        <DialogBody></DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </div>
  );
};
