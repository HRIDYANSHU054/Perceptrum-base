"use client";

import { useEffect, useRef } from "react";
import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";

import { cn } from "@/lib/utils";
import { HandPosition } from "@/types/types";

interface HandRecognizerProps {
  leftHandPosition: HandPosition;
  rightHandPosition: HandPosition;
  setHandResults: (
    leftHandPosition: HandPosition,
    rightHandPosition: HandPosition,
    isDetected: boolean
  ) => void;
}

function HandRecognizer({
  leftHandPosition,
  rightHandPosition,
  setHandResults,
}: HandRecognizerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(function () {
    //interval ids
    let detectionIntervalId: NodeJS.Timeout;

    function processDetections(
      detections: HandLandmarkerResult,
      setHandResults: (
        leftHandPosition: HandPosition,
        rightHandPosition: HandPosition,
        isDetected: boolean
      ) => void
    ) {
      let leftX = 0,
        leftY = 0,
        rightX = 0,
        rightY = 0;

      if (detections && detections.handedness.length > 0) {
        // console.log(detections);  // just for the time being

        const rightIndex =
          detections.handedness[0][0].categoryName === "Right" ? 0 : 1;
        const leftIndex = 1 - rightIndex;

        //Check if left hand is detected
        if (detections.landmarks[leftIndex]) {
          ({ x: leftX, y: leftY } = detections.landmarks[leftIndex][6]);
        }

        //Check if right hand is detected
        if (detections.landmarks[rightIndex]) {
          ({ x: rightX, y: rightY } = detections.landmarks[rightIndex][6]);
        }

        //NOTE: We can here multiply these values by videoElem.videoWidth and videoHeight

        // console.log(leftX, leftY, rightX, rightY); //
        setHandResults(
          { left: leftX, top: leftY },
          { left: rightX, top: rightY },
          true
        );
        return;
      }

      //not detected any hands
      setHandResults(
        { left: leftX, top: leftY },
        { left: rightX, top: rightY },
        false
      );
    }

    //model initializer
    async function initModel() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        //this handlandmarker whill be used for detection
        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "/models/hand_landmarker.task",
            delegate: "GPU",
          },
          numHands: 2,
          runningMode: "VIDEO",
        });

        return handLandmarker;
      } catch (err) {
        const error = err as Error;
        console.log("Error while initializing model", error.message);
        throw error;
      }
    }
    //%%%%%%%%%%%%%%%%%%%%%%%%%%
    //%%%%%%%%%%%%%%%%%%%%%%%%%%

    //video initialiser
    async function initVideo(videoElement: HTMLVideoElement) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        videoElement.srcObject = stream;

        //play the video when it has loaded
        videoElement.addEventListener("loadeddata", () => {
          videoElement.play();
        });
      } catch (err) {
        const error = err as Error;
        if (error.name === "NotAllowedError") {
          console.log("User did not grant permission for video access");
        } else {
          console.log("Error while initializing video", error.message);
        }
        throw error;
      }
    }
    //%%%%%%%%%%%%%%%%%%%%%%%%%%
    //%%%%%%%%%%%%%%%%%%%%%%%%%%

    //video and model initialiser
    async function initVideoAndModel() {
      try {
        const videoElem = videoRef.current;
        if (!videoElem) return;

        await initVideo(videoElem);

        const handLandmarker = await initModel();

        //now detect every k seconds
        detectionIntervalId = setInterval(() => {
          const detections = handLandmarker?.detectForVideo(
            videoElem,
            Date.now()
          );

          if (!detections) return;
          processDetections(detections, setHandResults);
        }, 1000 / 30); //33fps
      } catch (err) {
        const error = err as Error;
        console.log("An Error in Initialization:", error.message);
      }
    }
    //%%%%%%%%%%%%%%%%%%%%%%%%%%
    //%%%%%%%%%%%%%%%%%%%%%%%%%%

    //on model load
    initVideoAndModel();

    //clean the interval mess when component unmounts
    return () => {
      if (detectionIntervalId) clearInterval(detectionIntervalId);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        className={cn(
          " absolute inset-0 w-full h-full object-cover -scale-x-1"
        )}
      ></video>
    </div>
  );
}

export default HandRecognizer;
