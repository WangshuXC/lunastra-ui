"use client";
import React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { toast, Toaster } from "sonner";
import { ButtonsCard } from "@/components/ui/tailwind-css-buttons";

type ButtonComponent = {
  name: string;
  description: string;
  component: React.ReactNode;
};

export default function TailwindcssButtons() {
  const copy = (button: ButtonComponent) => {
    const buttonString = reactElementToJSXString(button.component);

    if (buttonString) {
      const textToCopy = buttonString;
      copyToClipboard(textToCopy);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text);
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying text to clipboard:", err);
        toast.error("Error copying to clipboard");
      });
  };
  return (
    <div className="pb-40 px-4 w-full">
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full  max-w-7xl mx-auto gap-10">
        {buttons.map((button, idx) => (
          <ButtonsCard key={idx} onClick={() => copy(button)}>
            {button.component}
          </ButtonsCard>
        ))}
      </div>
    </div>
  );
}
export const buttons = [
  {
    name: "Hover",
    description: "Hover button for your website",
    component: (
      <button className="text-xl w-32 h-12 rounded-lg bg-sky-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
        <span className="absolute bg-sky-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
        <span className="absolute bg-sky-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
        Hover
      </button>
    ),
  },
  {
    name: "Text",
    description: "Text button for your website",
    component: (
      <button className="cursor-pointer select-none text-[4em] font-bold text-slate-100 relative group text-center flex justify-center items-center">
        <div className="absolute top-1.5 text-neutral-400 transition duration-300 drop-shadow-lg group-hover:drop-shadow-md group-active:drop-shadow-none">
          text
        </div>
        <div className="absolute top-1 text-neutral-300">text</div>
        <div className="absolute transition duration-300 transform group-hover:translate-y-1 group-active:translate-y-1.5">
          text
        </div>
        <div className="dont-mind-me opacity-0">text</div>
      </button>
    ),
  },
  {
    name: "Back",
    description: "Back button for your website",
    component: (
      <button
        className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
        type="button"
      >
        <div className="bg-sky-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            height="25px"
            width="25px"
          >
            <path
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              fill="#000000"
            ></path>
            <path
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              fill="#000000"
            ></path>
          </svg>
        </div>
        <p className="translate-x-2">Back</p>
      </button>
    ),
  },
];
