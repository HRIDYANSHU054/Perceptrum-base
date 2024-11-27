import { useDrumsContext } from "@/contexts/DrumsContext";
import { BoxCoords } from "@/types/types";

interface DrumContainerProps {
  lhCoords: BoxCoords;
  rhCoords: BoxCoords;
  constrainToParent: React.RefObject<HTMLDivElement>;
}

function DrumsContainer({
  lhCoords,
  rhCoords,
  constrainToParent,
}: DrumContainerProps) {
  const { drums } = useDrumsContext();

  return (
    <div className="top-0 left-0 absolute z-5 w-full h-full   text-white flex items-center justify-center ">
      {drums.map((drum, ind) => (
        <drum.component
          key={drum.id}
          lhCoords={lhCoords}
          rhCoords={rhCoords}
          constrainToParent={constrainToParent}
          flip={(ind + 1) % 2 === 0}
        />
      ))}
    </div>
  );
}

export default DrumsContainer;
