import { useState } from "react";

import InstrumentsItem from "./InstrumentsItem";
import { instruments } from "@/constants/Instruments";
import { useDrumsContext } from "@/contexts/DrumsContext";

interface InstrumentsProps {}

function Instruments({}: InstrumentsProps) {
  const [isOpen, setIsOpen] = useState<boolean | number>(false);
  const { addDrum } = useDrumsContext();

  return (
    <div className="flex flex-col gap-3 h-1/4">
      <p className="text-xl font-semibold">Instruments</p>
      <ul className="flex flex-col gap-3 pt-2 overflow-y-scroll no-scrollbar scroll-smooth w-[17rem]">
        {instruments.map((instr) => (
          <InstrumentsItem
            key={instr.drumId}
            name={instr.name}
            src={instr.image}
            info={instr.info}
            isOpen={isOpen === instr.drumId}
            handleReveal={() => {
              setIsOpen((prev) =>
                prev === instr.drumId ? false : instr.drumId
              );
            }}
            handleAddDrum={() => {
              //add this drum to the global drums array
              addDrum({
                id: Math.random(),
                component: instr.comp,
                name: instr.name,
              });
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default Instruments;
