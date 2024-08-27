"use client";

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            <div key={pathname}>
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{
                        opacity: 0,
                        transition: { 
                            delay: 1, 
                            delay: 2.4,
          duration: 0.1,
          ease: "easeIn" 
                            ease: "easeInOut" 
                        }
                    }}
                    className="h-screen w-screen fixed dark:bg-primary top-0 pointer-events-none"
                />
                {children}
            </div>
        </AnimatePresence>
    )
}

export default PageTransition