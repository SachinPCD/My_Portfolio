import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MouseLight from './Components/MouseLight'
import './App.css' // 👈 CSS import
import Navbar from './Components/Navbar.jsx'
import Hero from './Components/Hero'
import Skills from './Components/Skills'
import Projects from './Components/Projects'
import Experience from './Components/Experience'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import CustomCursor from './Components/CustomCursor'
import CustomStars from './Components/Starts'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          className="loader-container"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="loader-text"
          >
            Loading...
          </motion.div>
        </motion.div>
      ) : (
        <div className="app-wrapper">
          <Canvas className="canvas-background">
            <CustomStars />
            <OrbitControls enableZoom={false} />
         <MouseLight /> 
          </Canvas>
          <Navbar />
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
          <CustomCursor />
        </div>
      )}
    </AnimatePresence>
  )
}

export default App
