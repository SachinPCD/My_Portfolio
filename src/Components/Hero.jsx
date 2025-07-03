import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import '../Styles/Hero.css';

const Model = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.8} />
    </mesh>
  );
};

const Hero = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="home" ref={ref} className="hero-section">
      <div className="hero-overlay" />

      <div className="hero-container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: inView ? 1 : 0.5, x: inView ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <motion.h1
            className="hero-title"
            animate={{
              background: inView
                ? 'linear-gradient(90deg, #ffffff, #ec4899)'
                : 'linear-gradient(90deg, #ffffff, #ffffff)',
            }}
            style={{ WebkitBackgroundClip: 'text' }}
          >
            Hi, I'm <span className="highlight">Sachin Gandu</span>
          </motion.h1>

          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Professional <span className="highlight-light">Job Title</span>
          </motion.h2>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I create amazing digital experiences with cutting-edge technologies and innovative design.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(236, 72, 153, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Contact Me
            </motion.a>

            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline"
            >
              View Work
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-canvas"
          initial={{ opacity: 0, x: 50, rotateY: 180 }}
          animate={{ opacity: inView ? 1 : 0.5, x: inView ? 0 : 20, rotateY: inView ? 0 : 180 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Model />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
