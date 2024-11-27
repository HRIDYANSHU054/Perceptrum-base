"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useSound from "use-sound";

import { BoxCoords } from "@/types/types";

export interface DrumProps {
  initXPos?: number;
  initYPos?: number;
  lhCoords: BoxCoords;
  rhCoords: BoxCoords;
  constrainToParent: React.RefObject<HTMLDivElement>;
  flip?: boolean;
}

function hasCollided(coords1: BoxCoords, coords2: BoxCoords): boolean {
  return (
    ((coords1.left >= coords2.left && coords1.left <= coords2.right) ||
      (coords1.right >= coords2.left && coords1.right <= coords2.right)) &&
    ((coords1.top >= coords2.top && coords1.top <= coords2.bottom) ||
      (coords1.bottom >= coords2.top && coords1.bottom <= coords2.bottom))
  );
}

//memoise this comp
const Drum2 = memo(function Drum2({
  initXPos,
  initYPos,
  lhCoords,
  rhCoords,
  constrainToParent,
  flip = false,
}: DrumProps) {
  const [xPos, setXPos] = useState(initXPos ?? 0);
  const [yPos, setYPos] = useState(initYPos ?? 0);
  const [collided, setCollided] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const drumSheetRef = useRef<HTMLDivElement>(null);

  // sounds state
  const [playSoundBoom] = useSound("/sounds/drumTom3.mp3", { volume: 1 });

  useEffect(
    function () {
      const drumSheetElem = drumSheetRef.current;
      if (!drumSheetElem) return;

      const drumCoords = {
        top: drumSheetElem.getBoundingClientRect().top,
        left: drumSheetElem.getBoundingClientRect().left,
        right: drumSheetElem.getBoundingClientRect().right,
        bottom: drumSheetElem.getBoundingClientRect().bottom,
      };

      if (
        hasCollided(lhCoords, drumCoords) ||
        hasCollided(rhCoords, drumCoords)
      ) {
        if (!collided) {
          console.log("BANG HIT");
          setCollided(true);
          playSoundBoom();
        }
      } else {
        setCollided(false);
      }

      // console.log(lhCoords);
      // console.log(rhCoords);
    },
    [lhCoords, rhCoords]
  );

  return (
    <motion.div
      ref={containerRef}
      drag
      whileDrag={{ cursor: "grab", scale: 1.1 }}
      dragConstraints={constrainToParent}
      // style={{ left: `${xPos}%`, top: `${yPos}%` }}
      className="absolute hover:cursor-pointer  "
      style={flip ? { rotateY: "180deg" } : {}}
    >
      <Image src="/7.png" alt="drum" width={200} height={300} />

      {/* our circle will act as the drum sheet and this will be the area where we check a hit */}
      <div
        ref={drumSheetRef}
        className="absolute top-[17%] left-[7%]  z-10 bg-gray-700 h-[14%] w-[88%] rounded-[50%] flex justify-center items-center"
      >
        {collided ? "VANG" : "SILENC"}
      </div>

      {/* to make this thing move somehow drag events are  not propagating with images even the normal html <img/> */}
      {/* we use this div to cover the entire parent so that this whole comp can move and then we make this div transparent */}
      <div className="absolute z-5 top-0 left-0 right-0 bottom-0 bg-transparent"></div>
    </motion.div>

    // ====
    // The original normal circle that was working till last checked and hope will work on next test also
    // <motion.div
    //   ref={drumRef}
    //   drag
    //   whileDrag={{ cursor: "grab", scale: 1.1 }}
    //   dragConstraints={constrainToParent}
    //   style={{ left: `${xPos}%`, top: `${yPos}%` }}
    //   className="absolute size-48 hover:cursor-pointer rounded-full border-2 border-blue-950 bg-blue-300 flex items-center justify-center"
    // >
    //   {collided ? "VANG" : "SILENC"}
    // </motion.div>
  );
});

export default Drum2;
