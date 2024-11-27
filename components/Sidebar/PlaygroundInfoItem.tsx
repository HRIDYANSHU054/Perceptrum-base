import { X } from "lucide-react";

interface PlaygroundInfoItemProps {
  drumName: string;
  handleRemoveDrum: () => void;
}

function PlaygroundInfoItem({
  drumName,
  handleRemoveDrum,
}: PlaygroundInfoItemProps) {
  return (
    <li className="flex justify-between items-center  border border-emerald-400 py-2 px-4 rounded-lg group hover:rotate-[0.7deg] hover:z-5 transition hover:tracking-wide hover:bg-neutral-950">
      {drumName}
      <button>
        <X
          className="w-4 h-4 stroke-neutral-200 group-hover:stroke-[3]  transition"
          onClick={handleRemoveDrum}
        />
      </button>
    </li>
  );
}

export default PlaygroundInfoItem;
