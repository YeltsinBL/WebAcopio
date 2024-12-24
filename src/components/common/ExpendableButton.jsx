import { ChevronDown, ChevronUp } from "lucide-react";

export const ExpendableButton = ({ isOpen, toggle }) => {
  return (
    <button onClick={toggle} className="">
      <ChevronDown
        className={`h-5 w-5 transition-transform duration-250 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>
  );
};
