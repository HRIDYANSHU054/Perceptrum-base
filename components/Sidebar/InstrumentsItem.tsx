import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";

interface InstrumentsItemProps {
  isOpen: boolean;
  handleReveal: () => void;
  handleAddDrum: () => void;
  name: string;
  info: string;
  src: string;
}

function InstrumentsItem({
  name,
  info,
  src,
  isOpen,
  handleReveal,
  handleAddDrum,
}: InstrumentsItemProps) {
  return (
    <li className="flex flex-col  border border-emerald-400  px-4 rounded-lg group      transition divide-y divide-emerald-400 hover:bg-neutral-950">
      <div className="flex justify-between items-center py-2 ">
        {name}
        <div className="flex justify-between items-center gap-2">
          <button onClick={handleReveal}>
            <ChevronDown className=" w-4 h-4 stroke-neutral-200 group-hover:stroke-[3]  transition" />
          </button>
          <button onClick={handleAddDrum}>
            <Plus className=" w-4 h-4 stroke-neutral-200 group-hover:stroke-[3]  transition" />
          </button>
        </div>
      </div>{" "}
      {/* more info */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto" },
              collapsed: { height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <motion.div
                variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                transition={{ duration: 0.8 }}
                className="flex gap-2  py-2"
              >
                <div className="w-24">
                  <div className="relative w-24 h-20 rounded-sm  hover:-rotate-1 hover:scale-105 transition">
                    <Image
                      src={src}
                      alt={`${name} image`}
                      quality={80}
                      fill
                      className="object-cover object-center "
                    />
                  </div>
                </div>

                <p>{info}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default InstrumentsItem;
