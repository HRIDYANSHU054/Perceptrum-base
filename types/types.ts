import { ComponentType, ReactNode } from "react";

import { DrumProps } from "@/components/Drum";

export type Drum = {
  component: ComponentType<DrumProps>;
  id: number;
  name: string;
};

export type DrumContextType = {
  drums: Drum[];
  addDrum: (newDrum: Drum) => void;
  removeDrum: (drumId: number) => void;
} | null;

export type HandPosition = {
  left: number;
  top: number;
};

export type BoxCoords = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};
