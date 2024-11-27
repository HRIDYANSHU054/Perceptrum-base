import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Drum, DrumContextType } from "@/types/types";

const DrumsContext = createContext<DrumContextType>(null);

function DrumsProvider({ children }: { children: React.ReactNode }) {
  const [drums, setDrums] = useState<Drum[]>([]);

  function addDrum(newDrum: Drum) {
    setDrums((drums) => [...drums, newDrum]);
  }

  function removeDrum(drumId: number) {
    setDrums((drums) => drums.filter((drum) => drum.id !== drumId));
  }

  return (
    <DrumsContext.Provider value={{ drums, addDrum, removeDrum }}>
      {children}
    </DrumsContext.Provider>
  );
}

function useDrumsContext() {
  const context = useContext(DrumsContext);

  if (!context) throw new Error("DrumsContext used outside of DrumsProvider");

  return context;
}

export { DrumsProvider, useDrumsContext };
