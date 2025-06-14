import imgMain from '../public/assets/mantenimiento.png'
import { motion } from "framer-motion";
import Image from "next/image";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight dark:bg-primary px-4">
      {/* Motion Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Maintenance SVG */}
        <div className="mb-8">
          <Image
            src={imgMain}
            alt="Mantenimiento"
            width={300}
            height={300}
            className="mx-auto"
            priority
          />
        </div>

        {/* Text */}
        <h1 className="text-3xl md:text-5xl font-bold text-primary dark:text-white mb-4">
          ¡Estamos en mantenimiento!
        </h1>
        <p className="text-lg text-gray-700 dark:text-white/60 max-w-xl mx-auto">
          Estamos trabajando para mejorar tu experiencia. Vuelve pronto para
          descubrir las novedades.
        </p>
      </motion.div>
    </div>
  );
};

export default MaintenancePage;
