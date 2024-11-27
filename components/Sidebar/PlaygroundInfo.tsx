import { X } from "lucide-react";
import PlaygroundInfoItem from "./PlaygroundInfoItem";
import { useDrumsContext } from "@/contexts/DrumsContext";

function PlaygroundInfo() {
  const { drums, removeDrum } = useDrumsContext();

  return (
    <div className="flex flex-col gap-3 h-1/4">
      <p className="text-xl font-semibold">PlayGround</p>
      <ul className="flex flex-col gap-3 pt-2 overflow-y-scroll no-scrollbar scroll-smooth">
        {drums.map((drum) => (
          <PlaygroundInfoItem
            key={drum.id}
            drumName={drum.name}
            handleRemoveDrum={() => removeDrum(drum.id)}
          />
        ))}
        {/* <PlaygroundInfoItem drumName="Drum 1" /> */}
      </ul>
    </div>
  );
}

export default PlaygroundInfo;
