"use client";

import { HandIcon } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { useElementCoords } from "@/hooks/useElementCoords";
import { BoxCoords, HandPosition } from "@/types/types";
import DrumStick from "@/components/DrumStick";

interface MovingHandsProps {
  lhPos: HandPosition;
  rhPos: HandPosition;
  lhCoordsRef: React.MutableRefObject<BoxCoords>;
  rhCoordsRef: React.MutableRefObject<BoxCoords>;
}

function MovingHands({
  lhPos,
  rhPos,
  lhCoordsRef,
  rhCoordsRef,
}: MovingHandsProps) {
  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);

  // %%%%%%%%%%%%%%%%%%%%%%%%%
  const posChangedLeft =
    leftHandRef.current?.getBoundingClientRect().left ?? null;
  const rightPosChangedLeft =
    rightHandRef.current?.getBoundingClientRect().left ?? null; //remove if dont work
  useEffect(
    function () {
      const leftHand = leftHandRef.current;
      const rightHand = rightHandRef.current;
      if (!leftHand) return;

      //
      // console.log("Left Pos Chnaged");
      // console.log(leftHand.getBoundingClientRect().left);
      // console.log(leftHand.getBoundingClientRect().top);

      lhCoordsRef.current = {
        left: posChangedLeft ?? lhCoordsRef.current.left,
        right:
          leftHand.getBoundingClientRect().right ?? lhCoordsRef.current.right,
        top: leftHand.getBoundingClientRect().top ?? lhCoordsRef.current.top,
        bottom:
          leftHand.getBoundingClientRect().bottom ?? lhCoordsRef.current.bottom,
      };

      if (!rightHand) return;

      rhCoordsRef.current = {
        left: rightPosChangedLeft ?? rhCoordsRef.current.left,
        right:
          rightHand.getBoundingClientRect().right ?? rhCoordsRef.current.right,
        top: rightHand.getBoundingClientRect().top ?? rhCoordsRef.current.top,
        bottom:
          rightHand.getBoundingClientRect().bottom ??
          rhCoordsRef.current.bottom,
      };
    },
    [posChangedLeft, rightPosChangedLeft, lhCoordsRef, rhCoordsRef]
  );
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  // useEffect(function () {
  //   const leftHand = leftHandRef.current;
  //   const rightHand = rightHandRef.current;
  //   if (!leftHand || !rightHand) return;

  //   console.log("Left Hand");
  //   console.log(leftHand.getBoundingClientRect().top);
  //   setLHCoords({
  //     top: leftHand.getBoundingClientRect().top,
  //     left: leftHand.getBoundingClientRect().left,
  //     right: leftHand.getBoundingClientRect().right,
  //     bottom: leftHand.getBoundingClientRect().bottom,
  //   });

  //   console.log("Right Hand");
  //   console.log(rightHand.getBoundingClientRect());
  //   setRHCoords({
  //     top: rightHand.getBoundingClientRect().top,
  //     left: rightHand.getBoundingClientRect().left,
  //     right: rightHand.getBoundingClientRect().right,
  //     bottom: rightHand.getBoundingClientRect().bottom,
  //   });
  // }, []);

  // const handleLeftHandCoords = useCallback(
  //   (rect: DOMRect) => {
  //     setLHCoords({
  //       top: rect.top,
  //       left: rect.left,
  //       right: rect.right,
  //       bottom: rect.bottom,
  //     });
  //   },
  //   [setLHCoords]
  // );

  // const handleRightHandCoords = useCallback(
  //   (rect: DOMRect) => {
  //     setRHCoords({
  //       top: rect.top,
  //       left: rect.left,
  //       right: rect.right,
  //       bottom: rect.bottom,
  //     });

  //     console.log("Changed in Observer"); //
  //   },
  //   [setRHCoords]
  // );

  // useElementCoords(leftHandRef, handleLeftHandCoords);
  // useElementCoords(rightHandRef, handleRightHandCoords);

  return (
    <>
      {/* left Hand */}
      <div
        ref={leftHandRef}
        style={{ right: `${lhPos.left}px`, top: `${lhPos.top}px` }}
        className="absolute z-10 -scale-x-1 transition-all duration-[10ms]"
      >
        <HandIcon size={48} className="stroke-slate-400" />
        {/* <DrumStick height={200} stroke="#94a3b8" strokeWidth={3} /> */}
      </div>

      {/* right Hand */}
      <div
        ref={rightHandRef}
        style={{ right: `${rhPos.left}px`, top: `${rhPos.top}px` }}
        className="absolute z-10 transition-all duration-[10ms] ease"
      >
        <HandIcon size={48} className="stroke-slate-400" />
        {/* <DrumStick height={200} stroke="#94a3b8" strokeWidth={3} /> */}
      </div>
    </>
  );
}

export default MovingHands;
