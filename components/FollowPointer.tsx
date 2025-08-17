import stringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";

function FollowPointer({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const color = stringToColor(info.email || "1");

  return (
    <motion.div
      className="absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Enhanced cursor with drop shadow */}
      <motion.svg
        stroke={color}
        fill={color}
        strokeWidth="1.5"
        viewBox="0 0 16 16"
        className="h-6 w-6 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] drop-shadow-md"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25))` }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 5.89a.5.5 0 0 1 .006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </motion.svg>

      {/* Enhanced name tag with better styling */}
      <motion.div
        style={{
          backgroundColor: color,
          boxShadow: `0 2px 5px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.1)`,
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="px-3 py-1.5 text-white font-medium whitespace-nowrap min-w-max text-xs rounded-lg ml-1 mt-1"
      >
        {info?.name || info.email}
      </motion.div>
    </motion.div>
  );
}

export default FollowPointer;
