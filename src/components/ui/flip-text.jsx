import { AnimatePresence, motion } from "framer-motion";

export function FlipText({
  children,
  duration = 0.5,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  className = "",
}) {
  if (typeof children !== "string") return null;
  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      <AnimatePresence mode="wait">
        {children.split("").map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className="drop-shadow-sm inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
