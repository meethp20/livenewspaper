import React from "react";
import { motion, scale, useAnimate } from "motion/react";
import { useEffect } from "react";

type prop = {
  children: React.ReactNode;
};
function animatedScreen({children}:prop){
  const [scope, animate] = useAnimate();
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

  useEffect(() => {
    async function sequence() {
      await animate(
        scope.current,
        { scale: 0.4, y: 0 },
        {
          duration: 1,
          delay: 1,
        }
      );

      await animate(
        scope.current,
        { y: -document.documentElement.scrollHeight * 0.26 },
        { duration: 1, ease: "easeOut" }
      );
      await animate(
        scope.current,
        { scale: 1, y: 0, rotate: -360 },
        { duration: 2.5, ease: "easeInOut" }
      );
    }
    sequence();
  }, [animate, scope]);

  return (
    <div>
      {" "}
      <motion.div ref={scope} style={{ display: "inline-block" }}>
        {children}
      </motion.div>
    </div>
  );
}

export default animatedScreen;
