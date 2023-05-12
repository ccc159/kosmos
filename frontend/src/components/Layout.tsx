import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// import Footer from "./Footer";
// import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0 },
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* <Navbar /> */}
      <AnimatePresence>
        <motion.main
          variants={variants}
          initial='initial'
          animate='animate'
          exit='exit'
        >
          <div className='flex flex-col w-screen h-screen'>{children}</div>
        </motion.main>
      </AnimatePresence>
      {/* <Footer /> */}
    </>
  );
}
