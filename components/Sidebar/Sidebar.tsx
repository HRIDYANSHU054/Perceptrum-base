import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

import PlaygroundInfo from "@/components/Sidebar/PlaygroundInfo";
import Instruments from "@/components/Sidebar/Instruments";

interface SidebarProps {}

const containerVariants = {
  close: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    x: "0%",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

function Sidebar({}: SidebarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerControls = useAnimationControls();

  useEffect(
    function () {
      if (isOpen) {
        containerControls.start("open");
      } else {
        containerControls.start("close");
      }
    },
    [isOpen]
  );

  function handleCloseSidebar() {
    setIsOpen(false);
  }

  function handleOpenSidebar() {
    setIsOpen(true);
  }
  return (
    <>
      {/* open sidebar button */}
      <button
        onClick={handleOpenSidebar}
        className="bg-neutral-900 p-4 rounded-md transition hover:bg-neutral-800 z-[100] absolute top-10 right-10 flex gap-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-move-left  w-6 h-6 stroke-neutral-200"
        >
          <path d="M6 8L2 12L6 16" />
          <path d="M2 12H22" />
        </svg>
        Options
      </button>
      <motion.aside
        animate={containerControls}
        variants={containerVariants}
        initial="close"
        className="bg-neutral-900 flex flex-col z-[1000] gap-20 p-5 absolute top-0 right-0 h-full shadow shadow-neutral-600 translate-x-[100%]"
      >
        <div className="flex flex-row w-full justify-between place-items-center gap-3">
          {/* <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" /> */}
          <div className="font-semibold text-4xl">Perceptrum</div>

          <button
            onClick={handleCloseSidebar}
            className="bg-neutral-950 p-4 rounded-md transition hover:bg-neutral-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-right w-6 h-6 stroke-neutral-200  "
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </button>
        </div>
        <PlaygroundInfo />
        <Instruments />
      </motion.aside>
    </>
  );
}

export default Sidebar;
