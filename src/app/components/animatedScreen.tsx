import React, { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

function AnimatedScreen({ children }: Props) {
  const [scope, animate] = useAnimate();

  // Prevent scrolling for 5s
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  // Run animation sequence
  useEffect(() => {
    async function sequence() {
      await animate(scope.current, [
        { scale: 0.4, y: 0, duration: 1, delay: 1 },
        { y: -document.documentElement.scrollHeight * 0.26, duration: 1, ease: "easeOut" },
        { scale: 1, y: 0, rotate: -360, duration: 2.5, ease: "easeInOut" }
      ]);
    }
    sequence();
  }, [animate, scope]);

  return (
    <div>
      <motion.div ref={scope} style={{ display: "inline-block" }}>
        {children}
      </motion.div>
    </div>
  );
}

export default AnimatedScreen;
